const natural = require("natural");

const { stem } = natural.PorterStemmer;
const tokenizer = new natural.WordTokenizer();


const fpDocuments = [
  `partial application allows us to pre-apply arguments to a function`,
  `pure functions modify no external state, nor do they change behaviour based on external influence`,
  `compose pure functions into larger pure functions`,
  `each function should have a clear and concise interface`,
];


const ooDocuments = [
  `strive to make methods simple`,
  `a class should have a single responsibility`,
  `favour composition of classes, rather than inheritance of types`,
  `build to an interface, rather than a base class`,
];


// const compositionDocuments = [
//   `partial application allows us to pre-apply arguments to a function`,
//   `compose pure functions into larger pure functions`,
//   `favour composition of classes, rather than inheritance of types`,
// ];


const testDocuments = [
  `composition of pure functions creates another pure function`,
  `avoid inheriting from abstract base classes`,
  `cookies are a sometimes food`,
  `interface with base class`,
];


const prepareTokens = document =>
  tokenizer
    .tokenize(document)
    .map(stem);

const addDocument = (classifier, label) => document =>
  classifier.addDocument(document, label);

const addClassification = (classifier) => ([documents, label]) =>
  documents.map(prepareTokens).forEach(addDocument(classifier, label));

const prepareClassifier = (classifier, classifications) => {
  classifications.forEach(addClassification(classifier));
  classifier.train();
  return classifier;
};


const classifier = new natural.BayesClassifier();

prepareClassifier(classifier, [ [fpDocuments, 'functional'],
                                [ooDocuments, 'object-oriented'] ]);

const results = testDocuments.map(test => `${classifier.classify(test)}: ${test}`);
console.log(results);

const test1 = "\nfunctions should be pure";
console.log(test1);
console.log(classifier.getClassifications(test1));
const test2 = "\ncookies are a sometimes food";
console.log(test2);
console.log(classifier.getClassifications(test2));