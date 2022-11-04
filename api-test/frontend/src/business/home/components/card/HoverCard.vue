<template>
  <div class="hover-card-main"
       @mouseenter="isHover=true"
       @mouseleave="isHover=false">
    <transition name="el-zoom-in-top">
      <div v-show="!isHover" class="transition-box">
        <slot name="mouseOn"></slot>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div v-show="isHover" class="transition-box-hover">
        <slot name="mouseOut"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HoverCard",
  data() {
    return {
      isHover: false,
    }
  },
  methods: {}
}
</script>

<style scoped>
.hover-card-main {
  box-sizing: border-box;
  height: 86px;
  background-color: #FFFFFF;
  position: relative;
}

.transition-box {
  height: 100%;
  width: 100%;
  background-color: #FFFFFF;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid #DEE0E3;
  border-radius: 4px;
}

.transition-box-hover {
  height: 100%;
  width: 100%;
  background-color: #DEE0E3;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid #DEE0E3;
  border-radius: 4px;
}
</style>
