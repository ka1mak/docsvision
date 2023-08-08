import React from 'react'
import { TaskTypes } from 'types/task'
import GroupTask from './GroupTask'
import IndividualTask from './IndividualTask'
import Button from './Button'

interface TreeProps {
  data: TaskTypes.Task[] 
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  const [expandedState, setExpandedState] = React.useState<TaskTypes.Expand>("idle")

  const expandAll = () => setExpandedState("expanded")
  const unExpandAll = () => setExpandedState("unexpanded")

  // Функция для рекурсивного рендеринга дерева задач
  const renderTree = (treeData: TaskTypes.Task[]): JSX.Element[] => {
    return treeData.map((task) =>
      task.isTaskGroup ? (
        <GroupTask
          task={task}
          renderTree={renderTree}
          expandedState={expandedState}
          setExpandedState={setExpandedState}
          key={task.id}
        />
      ) : (
        <IndividualTask
          task={task}
          renderTree={renderTree}
          setExpandedState={setExpandedState}
          expandedState={expandedState}
          key={task.id}
        />
      )
    )
  }

  // Состояния для определения, открыты ли все уровни (true) или свернуты (false)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div>
      <div className="sidebar">
        <Button onClick={expandAll}>Развернуть все</Button>
        <Button onClick={unExpandAll}>Свернуть все</Button>
        <button onClick={handlePrint}>Печать</button>
      </div>

      <ul className="tree">{renderTree(data)}</ul>
    </div>
  )
}

export default Tree
