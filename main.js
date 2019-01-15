Vue.component('form-group', {
    template: `
        <div class="container">
            <slot></slot>
        </div>
    `,
})

Vue.component('form-elem', {
    template: `
        <div class="form-group">
            <label for="">{{name}}</label>
            <input :type="type" class="form-control" :id="this.id"  @input="$emit('input', $event.target.value)" :placeholder="'Enter ' + name">
        </div>
    `,

    props: ['name', 'type', 'value'],

    data() {
        return {
            content: this.value,
        }
    },

    methods: {
        handleInput() {
            this.$emit('input', this.content)
        }
    },


    computed: {
        id() {
            return this.name.toLowerCase().replace(/ /g, '-')
        }

    } 

})


new Vue({
    el: "#root",

    data: {
        product: {
            name: '',
            desc: '',
            quantity: '',
            price: '',
        },
    },

    methods: {
        giveProductInfo() {
            console.log(this.product)
        }
    }


})