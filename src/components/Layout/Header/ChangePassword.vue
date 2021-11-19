<template>
  <el-dialog :title="title" v-model="visible" width="25%" :before-close="handleDialogClose">
    <div>testing ...</div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ChangePasswordDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  // props 不能去掉
  setup(props, context) {
    const handleDialogClose = () => {
      context.emit("update:visible", false)
    }
    return {
      handleDialogClose
    }
  }
}
</script>
<style lang="scss" scoped>

</style>