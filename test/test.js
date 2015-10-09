var r = Minplate.render, ra = Minplate.renderArray;

var data = {
    a: {
        b: {
            c: 'hello'
        }
    },
    beTrue: true,
    beFalse: false,
    com: function () {
        return this.a.b.c + ' world';
    }
};

var dataArray = [data, data];

var wrapper = {
    a: {
        b: 'wrapperB'
    }
};

QUnit.test( 'get property', function ( assert ) {
    assert.equal( r('{{ a.b.c }}', data), 'hello' );
    assert.equal( r('{{ a[b].c }}', data), 'hello' );
    assert.equal( r('{{ a[b]c }}', data), 'hello' );
    assert.equal( r('{{ a[b][c] }}', data), 'hello' );
    assert.equal( r('{{ a b c }}', data), 'hello' );
    assert.equal( r('{{ beTrue }}', data), 'true' );
    assert.equal( r('{{ beFalse }}', data), 'false' );
});

QUnit.test( 'get computing property', function ( assert ) {
    assert.equal( r('{{ com }}', data), 'hello world' );
});

QUnit.test( 'wrapper', function ( assert ) {
    assert.equal( r('{{ a.b }}', data, wrapper), 'wrapperB' );
    assert.equal( r('{{ a.b.c }}', data, wrapper), 'hello' );
});

QUnit.test( 'array', function ( assert ) {
    assert.equal( ra('{{ a.b.c }}', dataArray), 'hellohello' );
});

QUnit.test( 'array wrapper', function ( assert ) {
    assert.equal( ra('{{ a.b }}', dataArray, wrapper), 'wrapperBwrapperB' );
});