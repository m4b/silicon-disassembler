# Intro

`<silicon-disassembler>` is a high performance, asynchronous web-component using [capstone.js](https://github.com/AlexAltea/capstone.js) as the disassembler backend and Web Workers  with [Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)
 to provide non-blocking, entirely client-side disassembly of arbitrary `Uint8Array`'s, all in a conveniently encapsulated package.  Are you excited yet?

# Install

`bower install silicon-disassembler`

# Usage

Basic usage is:

````html
<silicon-disassembler auto offset="0x0" count="32" memory="0x1000" bytes="[[byteArray]]"></silicon-disassembler>
````

which automatically disassembles `count` bytes in `byteArray` whenever `offset`, `count`, or `memory` changes.  Memory current is just used in display and instruction byte count.

To force a disassembly of the current bytes, et. al., use `disassemble()`.

If you are coming from a non-polymer background, listen for the `instructions-changed` event.

See [the documentation](http://m4b.github.io/silicon-disassembler) for a demo and more information.

Enjoy, and welcome to the future.

# Notes

* _All your bytes is belong to us_: don't data-bind to `bytes`.  Currently, they all get sucked up when the Transfer Object is sent over.  This is for maximum flexibility, and errs on the side of efficiency (if they're sent in once for all time, why copy again).  _But_, if you need the bytes for something other than the disassembler, say a [hex-table](http://github.com/m4b/silicon-hex-table), make a copy via `new Uint8Array(bytes)` before you send them in.  If this is too unintuitive, this behavior my change in the future.
