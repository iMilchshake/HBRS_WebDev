//==================[ definitions ]==================

const square = (x) => {return x * x};
const add = (x, y) => {return x + y};
const mul = (x, y) => {return x * y};

//==================[ identity_function() ]==================

function identity_function(x) {
    return function(){
        return x
    }
}

const func = identity_function(1);
console.log("type: ", typeof func, ", value: ", func());
console.assert(func() === 1);

//==================[ addf() ]==================

function addf(x) {
    return function(y) {
        return x + y;
    }
}

console.log(addf(2)(3));
console.assert(addf(2)(3) === 5);

//==================[ applyf() ]==================

function applyf(f) {
    return function(x) {
        return function(y) {
            return f(x, y);
        }
    }
}

const addf2 = applyf(add);
console.log(addf2(2)(3));
console.assert(addf2(2)(3) === 5);

//==================[ curry() ]==================

function curry(f, x) {
    return function(y) {
        return f(x, y);
    }
}

const add3 = curry(add, 3);
console.log(add3(4));
console.assert(add3(4) === 7);

//==================[ inc() ]==================

const inc = addf(1);
console.log(inc(2));
console.assert(inc(2) === 3);

//==================[ methodize() ]==================

function methodize(f) {
    return function(y) {
        return f(this, y);
    }
}

Number.prototype.add = methodize(add);
console.log((3).add(4))
console.assert((3).add(4) === 7)

//==================[ demethodize() ]==================

function demethodize(f) {
    return function(x, y) {
        return f.apply(x,[y]); // bind x to 'this'
    }
}

console.log(demethodize(Number.prototype.add)(5, 6));
console.assert(demethodize(Number.prototype.add)(5, 6) === 11);

//==================[ twice() ]==================

function twice(f) {
    return function (x) {
        return f(x, x);
    }
}

const double = twice(add);
console.log(double(11));
console.assert(double(11) === 22);

//==================[ composeu() ]==================

function composeu(f1, f2) {
    return function(x) {
        return f2(f1(x));
    }
}



console.log(square(4));
console.log(composeu(double, square)(3))
console.assert(composeu(double, square)(3) === 36)

//==================[ composeb() ]==================

function composeb(f1, f2) {
    return function(x, y, z) {
        return f2(f1(x, y), z);
    }
}

console.log(composeb(add, mul)(2, 3, 5));
console.assert(composeb(add, mul)(2, 3, 5) === 25);

//==================[ once() ]==================

function once(f) {
    let not_used = true;
    return function(...x) {
        if(not_used) {
            not_used = false;
            return f(...x);
        }
        else {
            throw new Error("func was already called!");
        }
    }
}

add_once = once(add);

// call add_once
r1 = add_once(3, 4);
console.log(r1);
console.assert(r1 === 7);

// try calling it again
try {
    r2 = add_once(3, 4);
} catch(e) {
    console.assert(e instanceof Error);
}

//==================[ counterf() ]==================

function counterf(x) {
    let c = x;

    return {
        inc: function() {
            return ++c;
        },
        dec: function() {
            return --c;
        }
    }
}

counter = counterf(10);
x1 = counter.inc();
x2 = counter.dec();
console.log(x1, x2);
console.assert(x1 === 11);
console.assert(x2 === 10);

//==================[ revocable() ]==================

function revocable(f) {
    let revoked = false;
    return {
        invoke: function(...x) {
            if(revoked) {
                throw new Error("function was revoked!")
            } else {
                return f(...x);
            }

        },
        revoke: function() {
            revoked = true;
        }
    }
}

temp = revocable(console.log);
temp.invoke("test");
temp.revoke();
try {
    temp.invoke("test2");
} catch (e) {
    console.assert(e instanceof Error);
}

//==================[ Array Wrapper ]==================

function ArrayObject() {
    let array = [];

    return {
        get: function(i) {
            return array[i];
        },
        store: function(e, i) {
            array[i] = e;
        },
        append: function(e) {
            array.push(e);
        }
    }
}

a = ArrayObject();
a.store("abc", 0);
a.append("def");
console.log(a.get(0), a.get(1));
console.assert(a.get(0) === "abc", a.get(1) === "def");