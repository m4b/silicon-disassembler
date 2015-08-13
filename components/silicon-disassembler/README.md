# Intro

`<silicon-disassembler>` is a high performance, asynchronous web-component using [capstone.js](https://github.com/AlexAltea/capstone.js) as the disassembler backend and Web Workers to provide non-blocking, entirely client-side disassembly of arbitrary `Uint8Array`'s, all in a conveniently encapsulated package.  Are you excited yet?

# Usage

Basic usage is:

````html
<silicon-disassembler auto offset="0x0" count="32" memory="0x1000" bytes="[[byteArray]]"></silicon-disassembler>
````

which automatically disassembles `count` bytes in `byteArray` whenever `offset` changes.  If the memory location is different than `offset`, use `memory`.

To force a disassembly of the current bytes, et. al., use `disassemble()`.

If you are coming from a non-polymer background, listen for the `instructions-disassembled` event.

See [the documentation](http://m4b.github.io/silicon-disassembler) for a demo and more information.

Enjoy, and welcome to the future.

# TODO

* Implement architecture and CPU mode specification.  (hardcoded to x86-64 for now, sorry, will change ASAP!)
* Implement [Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)

