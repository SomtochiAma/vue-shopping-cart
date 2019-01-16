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

    computed: {
        id() {
            return this.name.toLowerCase().replace(/ /g, '-')
        }

    } 

})

Vue.component('product-table', {
    template: `
        <table class="table table-dark" id="allProducts">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantitiy</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <slot></slot>
        </table>
    `
})


Vue.component('product', {


    template: `
        <tbody>
            <tr v-for="product in events">
                <td>{{ product.name}}</td>
                <td>{{ product.desc}}</td>
                <td>{{ product.quantity}}</td>
                <td>{{ product.price}}</td>
                <td>
                    <button class="btn btn-danger removeBtn" @click="deleteProduct(product.name, isCart)">REMOVE</button>
                    <button class="btn btn-primary" @click="addProduct(product)" v-show="!isCart">ADD TO CART</button>
                </td>
            </tr>
        </tbody>
    `,

    props: {
        events: Array,  
        'is-cart': {default: false} 
    },

    
    methods: {
        deleteProduct(productObject, bool) {
            this.$emit('remove-product', productObject, bool)
        },

        addProduct(productName) {
            this.$emit('add-product', productName)
        },
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

        addedProducts: [],

        cart: [],
    },

    methods: {
        giveProductInfo() {
            console.log(this.product);
            let newProduct = {
                name: this.product.name,
                desc: this.product.desc,
                quantity: this.product.quantity,
                price: this.product.price,
            }

            console.log(newProduct);
            this.addedProducts.push(newProduct)
            
        },

        deleteProduct(productName, bool) {
            console.log(bool)
            if (bool) {
                this.cart = this.cart.filter( product => product.name !== productName)
            } else {
                this.addedProducts = this.addedProducts.filter( product => product.name !== productName)

            }
        },

        addProduct(product) {
            this.cart.push(product);
            console.log(this.cart)
        }
    }

})