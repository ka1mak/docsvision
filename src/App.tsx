import React from 'react'
import Tree from 'components/Tree'

const App = () => {
  const [treeData, setTreeData] = React.useState([])

  React.useEffect(() => {
    fetch('./response.json')
      .then(res => res.json())
      .then(({ data }) => setTreeData(data.tasksTreeItems))
  }, [])

  if (!treeData.length) return <h1>Loading...</h1>
  return (
    <>
      <Tree data={treeData} />
    </>
  )
}

export default App
