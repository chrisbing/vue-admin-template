<template>
    <div>
        <ul>
            <li v-for="p in posts">
                {{ p }}
            </li>
        </ul>
    </div>
</template>

<script>
    import {getPostList} from '../../../network'
    import store from 'store'

    export default {
        data(){
            return {
                posts: []
            }
        },
        created(){
            getPostList().then(response=>{
                this.posts = response.data
            })
            store
        }
    }

</script>