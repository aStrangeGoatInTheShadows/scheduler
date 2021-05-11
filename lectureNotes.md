<Header message="hello world" poop=5>

unlimited passing as props

do not need commas where you pass the args from

Keep children (components) as generic as possible

---

things have to be passed as CALLBACK for events
that means no parameters
if you need to pass parameters, wrap it in another function

EXAMPLE

if function is in the same scope - this is good
onClick={handleClick}

this runs infinitely!!!! DO NOT DO THIS!!!
onClick={handleClick(arg1, arg2)}

if function outside scope - this is good
onClick={() => handleClick(arg1, arg2)}

---

spread objects
spready arrays and objects within objects
otherwise you will overwrite the reference in memory
