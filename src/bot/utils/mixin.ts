class MixinBuilder {
    private readonly superclass: any
    constructor(superclass) {
        this.superclass = superclass;
    }
    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}

// Combine mixins into a single class
export const mix = (superclass) => new MixinBuilder(superclass);