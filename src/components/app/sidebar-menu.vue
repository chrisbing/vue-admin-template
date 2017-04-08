<template>
    <ul class="sidebar-menu">
        <li class="header">HEADER</li>
        <!-- Optionally, you can add icons to the links -->
        <li class="active">
            <router-link :to="{name: 'index'}"><i class="fa fa-link"></i> <span>首页</span></router-link>
        </li>
        <li class="treeview">
            <a href="#"><i class="fa fa-link"></i> <span>配置</span>
                <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
                <li><router-link :to="{name: 'profile1'}">配置1</router-link></li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        data(){
            return {
                menu: [{}]
            }
        }
    }

</script>