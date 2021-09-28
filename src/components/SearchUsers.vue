<template>
    <!-- Search -->
    <b-col cols="12" class="my-5 text-center">
        <div>
            <div>
                <b-row class="d-flex justify-content-center find-section">
                    <!--Input-->
                    <div>
                        <b-form-input
                            v-on:keyup.enter="search"
                            id="inline-form-input-search"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="Search"
                            v-model="searchKeyword"
                        ></b-form-input>
                    </div>
                    <div>
                        <b-button
                            class="primaryBackgroundColor"
                            @click="search"
                        >
                            Find
                        </b-button>
                    </div>
                    {{ searchKeyword }}
                </b-row>
            </div>
        </div>
    </b-col>
</template>

<script>
export default {
    props: ["users"],
    data() {
        return {
            searchKeyword: "",
            filteredUsers: null
        };
    },
    methods: {
        search() {
            if (this.searchKeyword != "") {
                this.filteredUsers = this.$props.users;
                var item = this.filteredUsers.filter(
                    item => item.id.includes(this.searchKeyword)
                    // ||
                    // item.name.includes(this.searchKeyword) ||
                    // item.phone_no.toLowerCase().includes(this.searchKeyword)
                );
                this.filteredUsers = item;
                console.log(this.filteredUsers);
                this.$emit("searchUsers", this.filteredUsers);
            } else {
                this.filteredUsers = this.$props.users;
                this.$emit("searchUsers", this.filteredUsers);
            }
        }
    },
    mounted() {
        // var finalYears = this.$props.years.map(function(obj) {
        //     return obj.title;
        // });
        // this.allyears = finalYears;
        // const insert = (arr, index, newItem) => [
        //     // part of the array before the specified index
        //     ...arr.slice(0, index),
        //     // inserted item
        //     newItem,
        //     // part of the array after the specified index
        //     ...arr.slice(index)
        // ];
        // this.allyears = insert(this.allyears, 0, {
        //     text: "Years...",
        //     value: null
        // });
        // var finalStates = this.$props.states.map(function(obj) {
        //     return obj.name;
        // });
        // this.allStates = finalStates;
        // this.allStates = insert(this.allStates, 0, {
        //     text: "States...",
        //     value: null
        // });
    }
};
</script>
