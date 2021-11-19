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
  setup() {
    const handleDialogClose = () => {
      console.log('testing ...')
      visible = !visible
    }
    return {
      handleDialogClose
    }
  }
}
</script>
<style lang="scss" scoped>

</style>