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
                        <b-button class="primaryBackgroundColor" @click="search"
                            >Find</b-button
                        >
                    </div>
                </b-row>
            </div>
        </div>
    </b-col>
</template>

<script>
export default {
    props: ["ads"],
    data() {
        return {
            searchKeyword: "",
            filteredAds: null
        };
    },
    methods: {
        search() {
            this.filteredAds = this.$props.ads;
            var item = this.filteredAds.filter(
                item =>
                    item.id.includes(this.searchKeyword) ||
                    item.title.includes(this.searchKeyword) ||
                    item.description
                        .toLowerCase()
                        .includes(this.searchKeyword) ||
                    item.user.name.includes(this.searchKeyword) ||
                    item.user.id.toLowerCase().includes(this.searchKeyword)
            );
            this.filteredAds = item;
            console.log(this.filteredAds);
            this.$emit("searchAds", this.filteredAds);
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
