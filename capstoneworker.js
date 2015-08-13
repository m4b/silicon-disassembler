importScripts('capstone.min.js');

function computeCPU(archstr, modenum){
  //console.log('arch, mode', archstr, modenum);
  var mode = capstone.MODE_64;
  var arch = capstone.ARCH_X86;
  if (archstr === 'x86' || archstr === 'X86'){
    console.log('capstone', capstone);
    if (modenum === 64) mode = capstone.MODE_64;
    if (modenum === 32) mode = capstone.MODE_32;
    if (modenum === 16) mode = capstone.MODE_16;
  } else if (archstr === 'arm' || archstr === 'ARM'){
    console.log('capstone', capstone);
    if (modenum == 64) mode = capstone.MODE_ARM;
    if (modenum == 32) mode = capstone.MODE_ARM;
    if (modenum == 16) mode = capstone.MODE_THUMB;
    arch = mode === 64 ? capstone.ARCH_ARM64 : capstone.ARCH_ARM64;
  }
  return {arch: arch, mode: mode};
}

//onmessage = (function(e) {
addEventListener('message', (
  function(e) {
  switch (e.data[0]){
    case 'dis':
      var offset = parseInt(e.data[1]);
      var count = parseInt(e.data[2])
      count = count ? count : self.bytes.length; // use whole length if count 0
      var memory = parseInt(e.data[3]);
      var end = offset+count;
      end = end >= self.bytes.length ? self.bytes.length : end;
      //console.log('offset, count, memory: ', offset, count, memory);
      var sub = self.bytes.subarray(offset, end);
      var instructions = self.decoder.disasm(sub, memory, count);
      postMessage(['instructions', instructions]);
      break;
    case 'init':
      self.bytes = new Uint8Array(e.data[1]);
      var cpu = computeCPU(e.data[2], e.data[3]);
      if (self.decoder) self.decoder.delete();
      self.decoder = new capstone.Cs(cpu.arch, cpu.mode);
      postMessage(['ready', true])
      break;
    case 'close':
      if (self.decoder) self.decoder.delete();
      self.close();
      break;
    default:
      console.warn('<silicon-disassembler> worker encountered unknown command %s', e.data);
  }
}));
