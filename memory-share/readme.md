### Memory share

Looks at how to share memory between WAT instances.

It creates a static _memory object using the *shared* property.

```javascript
// Create memory to the starting page size
MemoryShare._memory = new WebAssembly.Memory(
    {
        initial: 1,
        maximum: 10,
        shared: true
    });

// Set options
MemoryShare._options = {
    import: {
        memory: MemoryShare._memory
    }
}
```

This memory object is then used each time a new instance is created.

```javascript
// Instantiate a new instance
memoryShare._instance = await WebAssembly.instantiate(
    MemoryShare._module,
    MemoryShare._options);
```