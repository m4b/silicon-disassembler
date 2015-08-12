importScripts('capstone.min.js');

var decoder = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);

onmessage = function(e) {
  if (e.data === 'delete') {
    decoder.delete();
  } else {
    //console.log('worker message', e);
    var offset = parseInt(e.data[0]);
    var bytes = e.data[1];
    //console.log('bytes: ', bytes);
    var instructions = decoder.disasm(bytes, offset);
    //console.log('instructions: ', instructions);
    postMessage(instructions);
  }
};
