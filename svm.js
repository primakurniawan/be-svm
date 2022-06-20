async function svm(avgWeather) {
  const SVM = await require("libsvm-js");
  const svm = new SVM({
    kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
    type: SVM.SVM_TYPES.C_SVC, // The type of SVM I want to run
    gamma: 1, // RBF kernel gamma parameter
    cost: 1, // C_SVC cost parameter
  });

  var features = [
    //kondisi2 parameter yang ada dilapangan
    [-3, -1], // -4 -=> -1
    [-3, 0], // -3 -=> -1
    [-3, 1], // -2 -=> 0
    [-2, -1], // -3-=> -1
    [-2, 0], // -2 -=> 0
    [-2, 1], // -1 -=> 0
    [-1, -1], // -2 -=> 0
    [-1, 0], // -1 -=> 0
    [-1, 1], // 0 -=> 1
    [0, -1], // -1 -=> 0
    [0, 0], // 0 -=> 1
    [0, 1], // 1 -=> 1
  ];

  const labels = [-1, -1, 0, -1, 0, 0, 0, 0, 1, 0, 1, 1]; // aturan label ke feature hasil2 yg akan di outputkan

  svm.train(features, labels); // train the model
  return svm;
}

module.exports = svm;
