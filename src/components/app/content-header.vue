<template>
    <section class="content-header" v-show="route.path || route.title">
        <h1 v-show="route.title">
            {{ route.title }}

                    <small v-show="route.substitute">{{ route.subtitle }}</small>
        </h1>
        <ol class="breadcrumb" v-show="route.path">
            <li v-for="(p, i) in route.path"  v-if="i !== route.path.length - 1">
                <router-link :to="p"><i class="fa fa-dashboard"></i>{{ p.breadcrumb }}</router-link>
            </li>
            <li class="active" v-else>{{ p.breadcrumb }}</li>
        </ol>
    </section>
</template>

<script>
    export default {
        props: {
            route: Object
        }
    }
</script>