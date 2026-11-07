---
name: pos-and-retail-operations
description: >-
  Use when designing, auditing, or implementing a point-of-sale workflow for a
  tenant-aware retail or field-sales ERP where products, finished stock,
  customers, payments, and inventory truth must remain aligned. Use
  ecommerce-and-checkout-ux for consumer checkout and
  fintech-and-financial-product-ui for financial-product journeys.
metadata:
  portable: true
  category: 06-sector-and-domain-ux
  compatible_with:
    - claude-code
    - codex
---

# POS & Retail Operations

This skill owns the operational POS contract: a fast sale entry surface whose
customer, product, inventory, payment, permission, and accounting decisions
are explicit, repeatable, and auditable.

<!-- dual-compat-start -->
## Use When

- Building or reviewing a tenant-aware retail POS, field-agent POS, or manual
  sales-entry screen.
- Defining default-customer behaviour, product selection, stock validation,
  payment capture, or the relationship between products and finished stock.
- Auditing whether separate sales surfaces post to one canonical transaction
  boundary and produce consistent inventory/accounting outcomes.
- Designing a low-friction counter workflow where the operator needs speed,
  clear availability, and recoverable errors without sacrificing controls.

## Do Not Use When

- The journey is consumer discovery, online checkout, delivery tracking, or
  returns; use `ecommerce-and-checkout-ux`.
- The work is a generic form, table, modal, or validation pattern; use the
  relevant `04-web-and-ui-design` skill.
- The work is a financial statement, ledger, or accounting-control design;
  use the finance/accounting doctrine alongside this skill.
- The workflow is bulk quotation, order acceptance, delivery, invoicing, and
  payment collection; specify it as an order-to-cash workflow, not as POS.

## Required Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---:|---|
| Product-to-finished-stock map | Product and inventory owners | yes | Determines what may be sold and deducted |
| Manufacturing recipes and component rules | Manufacturing owner | yes when applicable | Ingredients are consumed at manufacture |
| Tenant, branch, store, and sales-agent permissions | Engineering and operations | yes | Prevents cross-tenant or cross-surface leakage |
| Customer and payment rules | Finance and sales owners | yes | Establishes default, credit, tender, and receipt behaviour |
| Supported devices and operator journeys | Research and operations | yes | Determines scan, search, list, card, and recovery treatment |

## Workflow

### 1. Name the three operational surfaces

Keep these surfaces distinct in copy, permissions, telemetry, and code:

1. `pos.php` — the general shop or tenant point of sale.
2. `agent-pos.php` — sales posted strictly on behalf of a sales agent.
3. `encode-sales.php` — manual entry of a sale that has already occurred.

They may share presentation components and the canonical posting service, but
they must not silently become interchangeable workflows. A separate bulk
order-to-cash process owns quote, customer order, delivery, invoice, and
payment collection.

### 2. Resolve the tenant default customer explicitly

Each tenant has one configured generic default customer, normally named
“Walk-in”. It is selected in tenant/franchise settings. Super administrators,
max administrators, and a tenant user granted the dedicated configuration
permission may change it.

All three POS surfaces must resolve the same server-side tenant setting on
load. They must not search for names containing “cash” or “walk”, choose the
first active customer, or allow a sales-point default to replace the tenant
default. A missing or inactive configuration is a visible configuration state,
not permission to guess.

The operator may replace the default with a named customer before posting; the
default is an initial state, not a hidden override of an intentional choice.

### 3. Keep product and stock identity separate

The operator sells a product. Each saleable product has one matching finished
stock item (1:1). The product carries customer-facing name, image, category,
price, and description; the stock item carries inventory identity, unit of
measure, batches, cost, and balance. The UI must never present ingredients,
packaging, or arbitrary raw stock items as sellable products.

Manufacturing consumes recipe ingredient stock items and produces the mapped
finished stock item. Selling a product deducts its mapped finished stock item,
not its recipe ingredients. Availability, FEFO/batch selection, costing, and
the ledger must use that mapping at the service boundary.

### 4. Design the operator loop

The primary loop is: identify operator context → confirm customer → find a
product → show price and available quantity → add or edit quantity → choose
tender or credit → review total → post once → show receipt/reference.

Make the current branch/store/agent context visible. Make product name and
finished-stock availability more prominent than internal codes. Keep the cart
editable, totals stable, and errors attached to the affected line. Preserve a
server-generated idempotency key across retries; never create duplicate sales
because a payment modal or network response was slow.

### 5. Make the boundary canonical

All three surfaces call the same posting service or an explicit adapter into
it. The transaction boundary must atomically validate tenant, permissions,
customer, product mapping, batch/stock availability, price, invoice, payment,
stock deduction, GL posting, and audit lineage. A UI “success” state is not
evidence; verify the persisted invoice, payment, stock ledger, and journal.

### 6. Design the visual system for operations

Use a restrained, high-contrast operational hierarchy: one clear primary
action, a persistent cart summary, visible context, and short recovery copy.
Choose a deliberate typeface pairing rather than a default dashboard font;
state the choice and test number legibility at the operator’s likely distance.
Use color for state (available, warning, blocked, paid) with text or icons as
the redundant cue. Apply the design doctrine, WCAG 2.2, and the host product’s
tokens; do not invent a decorative POS skin disconnected from the product.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Tenant default exists and active | Auto-load it in all three POS surfaces | Divergent customer attribution |
| Default missing or inactive | Show configuration warning and block unassigned posting | Silent sale to an arbitrary customer |
| Named customer deliberately selected | Preserve the selection through review and post | Resetting it on branch/product changes |
| Product has no active 1:1 finished-stock mapping | Hide/block it from POS and report the data defect | Selling ingredients or an unmapped phantom |
| Recipe ingredient stock is low | Stop manufacturing or warn manufacturing workflow | Deducting ingredients at sale |
| Finished stock is low | Block the sale or show the exact shortage | Allowing negative stock invisibly |
| Payment request times out | Retry the same idempotency key and reconcile status | Creating a duplicate invoice/payment |
| User has branch sales rights but no plant rights | Keep plant/job data out of POS and plant screens | Treating branch access as plant access |

## Capability Contract

- Read schemas, services, routes, permissions, and representative screens before
  changing a POS contract.
- Use server-derived tenant context and prepared statements; never trust a
  tenant, branch, store, or customer ID from the browser without validation.
- Edit only with explicit authority. Keep design review read-only until a
  bounded implementation request is given.
- Verify with PHP lint, JavaScript syntax checks, focused contract tests, and a
  database-backed apply/rollback or dry-run/verify path where available.

## Degraded Mode

- If the browser or database is unavailable, provide a screen/service contract
  and mark interaction, persistence, and accessibility checks unverified.
- If product-to-stock mappings are incomplete, do not invent mappings; return a
  defect register and block release of the affected products.
- If payment or GL fixtures are unavailable, verify the request shape and
  idempotency path only, and explicitly block production sign-off.

## Anti-Patterns

- Name search for “cash”, “walk”, or “default” → resolve an explicit tenant setting.
- First-active-customer fallback → show a configuration defect and stop posting.
- Raw ingredient or packaging cards in POS → expose only products with mapped finished stock.
- Recipe deduction during sale → consume ingredients at manufacture and finished stock at sale.
- Separate fake writers per screen → use one canonical transaction boundary.
- Customer selection reset after a sales-point or product refresh → preserve operator intent.
- A green toast without persisted evidence → reconcile invoice, payment, stock, GL, and audit records.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| POS surface contract | Product, design, and engineering | Three surfaces and the separate bulk workflow are named |
| Default-customer rule | Tenant administrators and QA | One server-resolved customer is shown in all three screens |
| Product-stock mapping contract | Inventory and manufacturing | Product sale and manufacturing deduction paths are distinct |
| Operator interaction spec | Design and frontend | Primary loop, states, recovery, and accessibility are testable |
| Posting verification record | Finance, audit, and engineering | Invoice/payment/stock/GL evidence reconciles with one idempotency key |

## Examples

See `examples/pos-and-retail-operations-worked.md` for a Nile Harvest-style
multi-surface walkthrough covering a configured Walk-in customer, a mapped
finished product, manufacturing consumption, sale deduction, and retry-safe
payment.

## References

- `skills/09-design-systems-tokens-and-theming/chwezi-business-app-house-style/SKILL.md` (one amber next-step button, task screens use line icons only)
- `doctrine/design-doctrine.md`
- `governance/design-quality-gate.md`
- `skills/06-sector-and-domain-ux/ecommerce-and-checkout-ux/SKILL.md`
- `skills/00-cross-cutting-ops-qa-a11y/accessibility-wcag-2-2-compliance/SKILL.md`
- `skills/04-web-and-ui-design/form-ux-design/SKILL.md`
<!-- dual-compat-end -->
