import React from "react"

export const useControl = () => {
  const [isExpandedAll, setIsExpandedAll] = React.useState(false)

  const expandAll = () => setIsExpandedAll(true)
  const unExpandAll = () => setIsExpandedAll(false)

  return {
    isExpandedAll,
    expandAll,
    unExpandAll,
  }
}