<template>
    <div>
        <template v-if="loading">
            <div></div>
        </template>

        <template v-else>
            <div>Test {{ world }}</div>
        </template>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    data() {
        return {
            world: null,
            loading: 0
        };
    },
    apollo: {
        world: {
            query: gql`
                query {
                    ads {
                        data {
                            id
                            title
                            description
                            price
                            sku
                            negotiable
                            created_at
                        }
                    }
                }
            `,
            update(data) {
                console.log(data);
                return data;
            }
        }
    }
};
</script>
