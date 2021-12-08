module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  // https://commitlint.js.org/#/reference-rules
  rules: {
    "type-enum": [2, "always", [
        "feat",     // 新功能
        "fix",      // bug修复提交
        "update",   // 功能、模块更新
        "refactor", // 功能、模块重构
        "optimize", // 功能、模块优化
        "revert",   // 回滚到指定 commit
        "style",    // 样式改动
        "docs",     // 文档补充、修改
        "perf",     // 性能或体验相关的代码提交
        "chore"     // 构建过程或辅助工具变更
      ]
    ],
    "type-case": [0],
    "type-empty": [2, "never"],
    "scope-empty": [0], // [2, "never"],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72]
  }
}
