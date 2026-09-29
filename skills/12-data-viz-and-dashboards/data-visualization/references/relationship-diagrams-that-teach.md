# Reference: Relationship Diagrams That Teach

Guidance for dependency graphs, architecture maps, module and entity relationship views, and any
node-and-edge picture whose job is to help a reader understand a structure, not just to show that
the structure is large.

**Why this matters.** Auto-generated force-directed graphs of codebases and systems often look
impressive and teach little; Understand Anything (Egonex-AI/Understand-Anything, MIT,
https://github.com/Egonex-AI/Understand-Anything, commit b05cc3b) is cited here as evidence of that
problem only. Every recommendation below rests on the human information-design authorities
listed at the end.

## Recommendations

Each line cites its authority in short form; the full references are in the Sources section.

1. **Choose an ordered or layered layout before a force-directed one.** When relationships have a
   direction (calls, depends-on, flows-to), place nodes in layers so edges run one way and edge
   crossings are reduced; this is the purpose of layered drawing. *(Sugiyama, Tagawa and Toda
   1981; Munzner 2014, networks chapter.)*
2. **Use a force-directed layout only when there is no order to show** and the reader's task is
   to see clusters or overall shape, not to follow paths. *(Munzner 2014, on matching the layout
   idiom to the task.)*
3. **Cap the number of visible nodes and disclose the rest progressively.** Show an overview,
   let the reader zoom and filter, and give details on demand, instead of drawing every node at
   once. *(Shneiderman 1996, the information-seeking mantra; Munzner 2014, reduce idioms: filter
   and aggregate.)*
4. **Treat roughly 50 nodes as the point where a node-link picture needs help.** In controlled
   testing, node-link readability fell sharply from about 50 nodes, while matrices stayed readable
   as graphs grew. Above that size, aggregate, filter or switch representation. *(Ghoniem, Fekete
   and Castagliola 2004.)*
5. **Offer a matrix for dense graphs.** An adjacency matrix, with rows and columns reordered so
   that related items sit together, shows dense connection patterns that a node-link drawing
   hides; keep node-link for path-following tasks on small graphs. *(Bertin 1967/1983, reorderable
   matrices; Ghoniem et al. 2004; Munzner 2014.)*
6. **Group related nodes visibly and caption each cluster.** Use enclosure, proximity or a shared
   region so a cluster is perceived as one unit, then label the cluster with a short caption that
   says what it is and why it matters. *(Ware 2020, Gestalt grouping: proximity, common region,
   connectedness; Tufte 1990, layering and separation.)*
7. **Put words next to the marks they explain.** Label clusters, entry points and important edges
   directly on the diagram rather than in a distant legend. *(Tufte 1990; Tufte 2006, integrating
   words and images.)*
8. **Set a reading order from the entry point to its dependants.** Start where the reader starts
   (the public interface, the user action, the root entity) and lay dependants after it in the
   reading direction, so the diagram can be read like a sequence. *(Sugiyama et al. 1981, layered
   direction; Ware 2020, on continuity and the path the eye follows.)*
9. **Separate layers of meaning visually.** Structural edges, data flow and annotation should not
   share the same weight and colour; mute the background structure and let the edges that carry
   the lesson stand out. *(Tufte 1990, layering and separation; Ware 2020, pre-attentive
   emphasis.)*
10. **When one picture cannot teach the whole structure, use small multiples or a sequence.** Show
    the same layout at several levels or for several scenarios, drawn consistently so the reader
    compares like with like. *(Tufte 1990, small multiples.)*

## Checks before publishing a relationship diagram

- The reader's task is written down (follow a path, find clusters, compare scenarios) and the
  layout matches it (recommendations 1, 2 and 5).
- The visible node count is stated; if it exceeds about 50, aggregation, filtering or a matrix
  alternative is in place (recommendations 3 to 5).
- Every cluster has a caption and the entry point is marked (recommendations 6 to 8).
- Colour is not the only carrier of meaning, and every text label meets the WCAG 2.2 contrast
  floor (`doctrine/references/wcag-2.2-criteria.md`).
- A text alternative lists the entry point, the main clusters and the key dependencies.

## Sources (verified 29 September 2026)

- Bertin, Jacques. *Semiology of Graphics: Diagrams, Networks, Maps.* Trans. William J. Berg.
  University of Wisconsin Press, 1983 (French original *Sémiologie graphique*, Gauthier-Villars,
  1967; reissued by Esri Press, 2010).
- Ghoniem, Mohammad, Jean-Daniel Fekete and Philippe Castagliola. "A Comparison of the
  Readability of Graphs Using Node-Link and Matrix-Based Representations." *Proceedings of the
  IEEE Symposium on Information Visualization (InfoVis 2004)*, 2004.
- Munzner, Tamara. *Visualization Analysis and Design.* A K Peters / CRC Press, 2014.
- Shneiderman, Ben. "The Eyes Have It: A Task by Data Type Taxonomy for Information
  Visualizations." *Proceedings of the IEEE Symposium on Visual Languages*, 1996.
- Sugiyama, Kozo, Shojiro Tagawa and Mitsuhiko Toda. "Methods for Visual Understanding of
  Hierarchical System Structures." *IEEE Transactions on Systems, Man, and Cybernetics* 11(2),
  1981, pp. 109–125. doi:10.1109/TSMC.1981.4308636.
- Tufte, Edward R. *Envisioning Information.* Graphics Press, 1990 (chapters "Layering and
  Separation" and "Small Multiples").
- Tufte, Edward R. *Beautiful Evidence.* Graphics Press, 2006.
- Ware, Colin. *Information Visualization: Perception for Design.* 4th ed. Morgan Kaufmann, 2020.

Citations are short paraphrases of each authority's argument; no passages are reproduced.
