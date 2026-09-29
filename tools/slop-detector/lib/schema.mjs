// A small JSON Schema (2020-12 subset) validator: type, enum, const, pattern,
// minLength, maxLength, minimum, minItems, uniqueItems, items, properties,
// required, additionalProperties, $ref (#/$defs/...), allOf, anyOf, oneOf, not,
// if/then/else, minProperties. Enough for the registry schema; no dependencies.

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (Number.isInteger(v)) return 'integer';
  return typeof v;
}

function typeMatches(v, t) {
  const actual = typeOf(v);
  if (t === 'number') return actual === 'number' || actual === 'integer';
  return actual === t;
}

export function validate(value, schema, root = schema, at = '$') {
  const errors = [];
  const sub = (v, s, p) => errors.push(...validate(v, s, root, p));
  if (schema === true || schema === undefined) return errors;
  if (schema === false) return [`${at}: not allowed`];
  if (schema.$ref) {
    const ref = schema.$ref.replace(/^#\//, '').split('/').reduce((o, k) => (o ? o[k] : undefined), root);
    if (!ref) return [`${at}: unresolved $ref ${schema.$ref}`];
    sub(value, ref, at);
  }
  if (schema.type) {
    const types = [].concat(schema.type);
    if (!types.some((t) => typeMatches(value, t))) return [...errors, `${at}: expected ${types.join('|')}, got ${typeOf(value)}`];
  }
  if (schema.enum && !schema.enum.some((e) => JSON.stringify(e) === JSON.stringify(value))) errors.push(`${at}: must be one of ${schema.enum.join(', ')}`);
  if ('const' in schema && JSON.stringify(schema.const) !== JSON.stringify(value)) errors.push(`${at}: must equal ${JSON.stringify(schema.const)}`);
  if (typeof value === 'string') {
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) errors.push(`${at}: does not match ${schema.pattern}`);
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push(`${at}: shorter than ${schema.minLength}`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push(`${at}: longer than ${schema.maxLength}`);
  }
  if (typeof value === 'number' && schema.minimum !== undefined && value < schema.minimum) errors.push(`${at}: below ${schema.minimum}`);
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${at}: fewer than ${schema.minItems} items`);
    if (schema.uniqueItems && new Set(value.map((v) => JSON.stringify(v))).size !== value.length) errors.push(`${at}: items not unique`);
    if (schema.items) value.forEach((v, i) => sub(v, schema.items, `${at}[${i}]`));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const r of schema.required || []) if (!(r in value)) errors.push(`${at}: missing "${r}"`);
    if (schema.minProperties !== undefined && Object.keys(value).length < schema.minProperties) errors.push(`${at}: fewer than ${schema.minProperties} properties`);
    const props = schema.properties || {};
    for (const [k, v] of Object.entries(value)) {
      if (k in props) sub(v, props[k], `${at}.${k}`);
      else if (schema.additionalProperties === false) errors.push(`${at}: unexpected property "${k}"`);
      else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') sub(v, schema.additionalProperties, `${at}.${k}`);
    }
  }
  for (const s of schema.allOf || []) sub(value, s, at);
  if (schema.anyOf && !schema.anyOf.some((s) => validate(value, s, root, at).length === 0)) errors.push(`${at}: matches none of anyOf`);
  if (schema.oneOf && schema.oneOf.filter((s) => validate(value, s, root, at).length === 0).length !== 1) errors.push(`${at}: must match exactly one of oneOf`);
  if (schema.not && validate(value, schema.not, root, at).length === 0) errors.push(`${at}: matches a forbidden schema`);
  if (schema.if) {
    const ok = validate(value, schema.if, root, at).length === 0;
    if (ok && schema.then) sub(value, schema.then, at);
    if (!ok && schema.else) sub(value, schema.else, at);
  }
  return errors;
}
