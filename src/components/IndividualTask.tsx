import React from 'react'
import { TaskTypes } from 'types/task'
import Button from './Button'

interface IndividualTaskProps {
  task: TaskTypes.Task
  expandedState: TaskTypes.Expand
  setExpandedState: React.Dispatch<React.SetStateAction<TaskTypes.Expand>>
  renderTree: (treeData: TaskTypes.Task[]) => JSX.Element[]
}

const IndividualTask: React.FC<IndividualTaskProps> = ({ task, renderTree, expandedState, setExpandedState }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { performer, state, report, tasksTreeItems } = task

  const handleToggleOpen = () => {
    setExpandedState("idle")
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  React.useEffect(() => {
    setIsOpen((prev) => {
      if (expandedState === 'expanded') {
        return true
      }

      if (expandedState === 'unexpanded') {
        return false
      }

      return prev
    })
  }, [expandedState])

  return (
    <li>
      <div className="line">
        {/* Вертикальная линия (отображается, если у задачи есть дочерние задачи) */}
        {isOpen && <div className={tasksTreeItems.length ? "vertical-line" : ""} />}

        {/* Кнопка для раскрытия/скрытия задачи (отображается, если у задачи есть дочерние задачи) */}
        {tasksTreeItems.length > 0 && (
          <div className="toggle">
            <Button onClick={handleToggleOpen}>
              {isOpen ? '-' : '+'}
            </Button>
          </div>
        )}

        {performer && (
          <div>
            <b>{performer.displayName}</b>, {performer.position}, {state}
          </div>
        )}

        {report && (
          <div>
            <b>Отчет:</b> {report}, {state}
          </div>
        )}
      </div>

      {/* Отображение дочерних задач (если задача открыта и у неё есть дочерние задачи) */}
      {isOpen && tasksTreeItems.length > 0 && (
        <ul>{renderTree(tasksTreeItems)}</ul>
      )}
    </li>
  )
}

export default IndividualTask
