module.exports = {
  mutipleMongooseToObject: function (docs = []) {
    return docs.map(doc =>
      // nếu là Mongoose Document thì gọi toObject(), ngược lại giữ nguyên
      typeof doc.toObject === 'function' ? doc.toObject() : doc
    );
  },

  mongooseToObject: function (doc) {
    return doc && typeof doc.toObject === 'function' ? doc.toObject() : doc;
  },
};