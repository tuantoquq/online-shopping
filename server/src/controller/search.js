import { Product } from '../model/index.js';
import bm25 from 'wink-bm25-text-search';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

var engine = bm25();
const nlp = winkNLP(model);
const its = nlp.its;

const prepTask = function (text) {
    const tokens = [];
    nlp.readDoc(text)
        .tokens()
        // Use only words ignoring punctuations etc and from them remove stop words
        .filter((t) => t.out(its.type) === 'word' && !t.out(its.stopWordFlag))
        // Handle negation and extract stem of the word
        .each((t) =>
            tokens.push(
                t.out(its.negationFlag) ? '!' + t.out(its.stem) : t.out(its.stem),
            ),
        );

    return tokens;
};

// Contains search query.
var query;

// Step I: Define config
// Only field weights are required in this example.
engine.defineConfig({ fldWeights: { name: 1, short_desciption: 2 } });
// Step II: Define PrepTasks pipe.
// Set up 'default' preparatory tasks i.e. for everything else
engine.definePrepTasks([prepTask]);

// Step III: Add Docs
// Add documents now...
for await (const product of Product.find()) {
    engine.addDoc({ name: product.name, shortDescription: product.shortDesciption }, i);
}

// Step IV: Consolidate
// Consolidate before searching
engine.consolidate();

query = 'receiving popular votes opponent';
// `results` is an array of [ doc-id, score ], sorted by score
var results = engine.search(query);
console.log(results);
