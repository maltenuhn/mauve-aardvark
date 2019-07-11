/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FlexRow, FlexColumn } from './helpers'
import { SquareButton, Grow, Row } from './helpers'
import { Subsection } from './helpers'
import { H1, H2, H3 } from './headings'
import { theme, styles } from './theme'
import { Button } from './button'
import { Icons } from './icons'
import useOnClickOutside from 'use-onclickoutside'
const R = require('ramda')

function Section(props) {
  return (
    <FlexColumn
      css={{
        backgroundColor: 'hsl(0,0%,95%)',
        boxShadow:
          ' 0px 0px .5px 0px hsl(0,0%,70%), 0px 0px 1px 0px hsl(0,0%,70%) ',
        width: '260px',
        ...props.style
      }}
    >
      <FlexRow
        onDoubleClick={props.onTitleDoubleClick}
        css={{
          label: 'PanelTitle',
          ...theme.typo.default,
          width: '260px',
          height: theme.layout.rowHeight.medium
        }}
      >
        <Grow> {props.title}</Grow>
        {props.actionsheet}

        {/*  I need to apply a hover to the actionsheet here, but it's being passed in. How do I do that?
      with css _on the parent_ it'd be easy: '&:hover Actionsheet' : { opacity: 100% }
      */}
      </FlexRow>

      {props.open ? (
        <FlexColumn
          css={{
            label: 'PanelBody'
          }}
        >
          {props.children}
        </FlexColumn>
      ) : null}
    </FlexColumn>
  )
}
const ActionSheet = props => (
  <FlexRow css={{ ...props.style, '& > * ': { marginLeft: 4 } }} {...props} />
)

const TargetSelectorPanel = props => {
  // fake data, should probably come from props
  const SAMPLE_PATH = [
    {
      label: 'LargeButtonComponent',
      selected: false,
      type: 'component',
      target: 'ELEM-1'
    },

    {
      label: 'ContainerView',
      selected: false,
      type: 'element',
      target: 'ELEM-13-295'
    },
    {
      label: 'MarginComponent',
      selected: false,
      type: 'element',
      target: 'ELEM-13-295'
    },

    { label: 'Label', selected: true, type: 'element', target: 'ELEM-13-295' }
  ]

  /**
   * renders a single Item
   * @param {*} item: targetSelectorPanelItem
   */
  const ItemLink = props => {
    const appliedStyle = props.item.selected
      ? { fontWeight: 700, '&:hover': { textDecoration: 'none' } }
      : {
          '&:hover': props.item.target
            ? { textDecoration: 'underline', cursor: 'pointer' }
            : {}
        }

    return <span css={{ ...appliedStyle }}>{props.item.label}</span>
  }

  // separate file
  // This is the list of style properties
  const ListOfStyleProperties = props => {
    // values

    const RAWLIST = [
      { id: 4, category: 'element', label: 'B Element' },
      { id: 5, category: 'property', label: 'customStyle1' },
      { id: 6, category: 'property', label: 'anOddStyle' },
      { id: 7, category: 'property', label: 'anotherStyle' }
    ]
    const [list, setList] = useState(RAWLIST)

    const addItemToList = item => {
      setList([...list, item])
    }

    // selection

    const [itemSelected, setItemSelected] = useState(null)

    //
    // renaming
    //

    const [itemBeingRenamed, setItemBeingRenamed] = useState(null)
    const [renameValueLive, setRenameValueLive] = useState(null)

    const handleRenameStart = item => {
      setItemBeingRenamed(item)
      setRenameValueLive(item.label)
      console.log('handle renaming of : ', item.label)
    }

    const handleRenameLiveKeydown = event => {
      console.log(event.key)
      if (event.key === 'Enter') {
        console.log('ENTER')
        handleRenameApply()
      } else if (event.key === 'Escape') {
        handleAbandonRename()
      }
    }

    const handleRenameLiveChange = event => {
      const filteredInput = event.target.value
      console.log(filteredInput)
      setRenameValueLive(filteredInput)
    }

    const handleRenameApply = () => {
      console.log(
        'Applying rename of item  ' +
          itemBeingRenamed.id +
          'from ' +
          itemBeingRenamed.label +
          ' to' +
          renameValueLive
      )
      handleAbandonRename()
      // TODO: actually make this apply the rename
    }

    const handleAbandonRename = item => {
      setItemBeingRenamed(null)
      setRenameValueLive(null)
    }

    // deletion
    const handleDelete = item => {
      console.log('ok1')
      if (item === null) {
        return
      }
      console.log('about to delete ', item.id)
      const idFilter = R.compose(
        R.reject,
        R.propEq('id')
      )
      const applyIdFilter = idFilter(item.id)
      const newList = applyIdFilter(list)
      console.log('ok3')
      // TODO handle deletion of selected property
      // (the below works, but assumes that the deleted element _is_ selected)
      const result = list.findIndex(x => x.id === item.id)
      console.log('ok4')
      if (result !== null && R.equals(list[result], itemSelected)) {
        const targetIndex =
          result > 0 ? result - 1 : list.length > result ? result + 1 : 0

        setItemSelected(list[targetIndex])
      }
      setList(newList)

      // TODO handle deletion of element vs property (shouldn't be possible, but safeguard)
    }

    //
    // adding
    //
    // adding is an interstitial state that
    // adds a row at the top of the list with
    // an input, and react-onclickoutside hoc that cancels the adding state
    // there is nothing actually being added

    const [transientAddingState, setTransientAddingState] = useState(false)

    const handleAbandonAdding = e => setTransientAddingState(false)

    const AddingRowComponent = props => {
      const ref = React.useRef(null)
      useOnClickOutside(ref, handleAbandonAdding)

      // need to store value in state,
      // so we can use it when actually adding
      // and make the add Input a controlled component
      // in the process
      const [addValueLive, setAddValueLive] = useState(null)

      const handleAddLiveChange = event => {
        // todo add validation
        setAddValueLive(event.target.value)
      }

      // TODO: this next line should of course handle the actual attempt
      //       right now this just handles abandon
      const handleSubmissionAttempt = e => {
        console.log('trying to add value: ', addValueLive)

        addItemToList({
          id: Math.round(Math.random() * 1000),
          label: addValueLive
        })
      }

      // radd
      return (
        <form onSubmit={() => handleSubmissionAttempt()}>
          <span ref={ref}>
            <FlexRow
              css={{
                height: theme.layout.rowHeight.medium,
                marginLeft: 8,
                marginRight: 8,
                marginBottom: 4,
                ...props.style
              }}
            >
              <input
                // the following line autofocuses the element when it's being rendered
                // since the whole adding section gets removed, this works well here.
                // TODO: check this in production
                autoFocus
                // the following event handlers should not be necessary once react-onclickoutside's
                // hook version is fixed

                onMouseUp={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                onChange={e => handleAddLiveChange(e)}
                css={{
                  // TODO: should use the standard input type, or style instead of standardUtopiaInputStyle
                  ...styles.input,
                  flexGrow: 1,
                  marginRight: 8
                }}
                type="text"
                default={props.default || '(variable name, no spaces)'}
                value={addValueLive}
              />
              <ActionSheet>
                <Button transparent onClick={() => handleAbandonAdding()}>
                  ×
                </Button>
                <Button
                  outlined
                  silent
                  onClick={() => handleSubmissionAttempt()}
                >
                  ✓
                </Button>
              </ActionSheet>
            </FlexRow>
          </span>
        </form>
      )
    }

    const ref = React.useRef(null)
    useOnClickOutside(ref, handleAbandonRename)

    // validation while editing.
    // we're using the rename input as a controlled component
    //  so it's getting its value from state

    return (
      <FlexColumn
        css={{
          marginTop: '8px',
          label: 'PropertySelectorControl',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          ...props.style
        }}
      >
        <FlexRow css={{ marginLeft: 8, marginRight: 8 }}>
          <H2 css={{ flexGrow: 1 }}>Style Props</H2>
          <ActionSheet>
            <Button
              disabled={transientAddingState}
              onClick={() => setTransientAddingState(true)}
            >
              <Icons.Plus />
            </Button>
          </ActionSheet>
        </FlexRow>
        {transientAddingState ? <AddingRowComponent /> : null}
        {list.map((item, index) => (
          <FlexRow
            key={'itemm' + index + Math.random() * 100}
            css={{
              position: 'relative',
              height: theme.layout.rowHeight.medium,
              fontWeight: R.equals(item, itemSelected) ? 600 : null,
              backgroundColor: R.equals(item, itemSelected)
                ? 'hsl(0,0%,97%)'
                : null,
              '& .onParentHover': {
                opacity: R.equals(item, itemSelected) ? 1 : 0
              },
              '&:hover .onParentHover': {
                opacity: 1
              }
            }}
            // HELP TODO
            onDoubleClick={e => handleRenameStart(item)}
            onMouseDown={e => setItemSelected(item)}
            onMouseEnter={e => (e.buttons === 1 ? setItemSelected(item) : null)}
          >
            <div
              style={{ display: 'inline-block', fontWeight: 600, width: 20 }}
            >
              {R.equals(item, itemSelected) ? '✓' : null}
            </div>

            {R.equals(item, itemBeingRenamed) ? (
              <input
                onKeyDown={e => handleRenameLiveKeydown(e)}
                onChange={e => handleRenameLiveChange(e)}
                // TODO remove once react-onclickoutside (hooks version) works again
                onMouseUp={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                ref={ref}
                autoFocus
                css={{ ...styles.input, fontSize: 11 }}
                placeholder={item.label}
                value={renameValueLive}
              />
            ) : (
              <>
                <span>{item.label}</span>
                <ActionSheet
                  className="onParentHover"
                  style={{ position: 'absolute', right: '0px' }}
                >
                  <Button transparent onMouseUp={() => handleRenameStart(item)}>
                    [...]
                  </Button>
                  <Button
                    transparent
                    onClick={e => e.stopPropagation()}
                    onMouseDown={e => e.stopPropagation()}
                    onMouseUp={e => {
                      handleDelete(item)
                    }}
                  >
                    <Icons.Plus style={{ transform: 'rotate(45deg)' }} />
                  </Button>
                </ActionSheet>
              </>
            )}
          </FlexRow>
        ))}
      </FlexColumn>
    )
  }

  const PathControl = SAMPLE_PATH.map((item, index, itemList) => (
    <>
      {item.type === 'component' ? (
        <FlexRow
          style={{ marginRight: 8, paddingTop: 1 }}
          key={'index' + index}
        >
          <Icons.Component />
        </FlexRow>
      ) : null}

      <ItemLink item={item} />
      {index < itemList.length - 1 ? (
        <span style={{ marginLeft: 4, marginRight: 4 }}>
          <Icons.ExpansionArrowSmall />
        </span>
      ) : null}
    </>
  ))

  const PathControlContainer = props => {
    const textStyle =
      props.isInstance || props.isComponent
        ? { color: '#6042f5' }
        : { color: 'black' }

    return (
      <FlexRow
        key={'hello90'}
        css={{
          ...textStyle,
          marginTop: 8
          // border: "1px solid red"
        }}
      >
        {PathControl}
      </FlexRow>
    )
  }

  const [isOpen, setIsOpen] = useState(true)

  const TargetSelectorPanelActionSheet = (
    <ActionSheet>
      <Button transparent silent>
        <Icons.Plus />
      </Button>
      <Button transparent silent>
        <Icons.Minus />
      </Button>
      <Button transparent silent>
        <Icons.FourDots />
      </Button>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <Icons.ExpansionArrow.Expanded />
        ) : (
          <Icons.ExpansionArrow.NotExpanded />
        )}
      </Button>
    </ActionSheet>
  )

  return (
    <Section
      style={{ backgroundColor: 'hsl(0,0%,99%)' }}
      className={props.className}
      title={<H1 style={{ padding: '4px' }}>{props.target}</H1>}
      actionsheet={TargetSelectorPanelActionSheet}
      open={isOpen}
      onTitleDoubleClick={() => setIsOpen(!isOpen)}
    >
      <FlexColumn style={{ width: '260px' }}>
        <FlexRow
          style={{
            marginLeft: '8px',
            marginRight: '8px',
            minHeight: theme.layout.rowHeight.large
          }}
        >
          <PathControlContainer isComponent />
        </FlexRow>
        <ListOfStyleProperties />
      </FlexColumn>
    </Section>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <FlexRow css={{ alignItems: 'flex-start' }}>
    <div style={{ ...theme.typo.default, height: 592 }}>
      <TargetSelectorPanel
        target="Instance"
        css={{ backgroundColor: 'white' }}
      />

      <Section title={<H1>Style</H1>} actionsheet={<div>Actions</div>}>
        <Subsection title="Fill" actions={<div>actionsheet!</div>}>
          <FlexRow style={{ marginLeft: '8px', marginRight: '8px' }}>
            Fill controls here
          </FlexRow>
        </Subsection>
        <Subsection title={<H2>Fill</H2>} actionsheet={<div>Actions</div>}>
          <FlexRow style={{ marginLeft: '8px', marginRight: '8px' }}>
            Color controls here
          </FlexRow>
        </Subsection>
      </Section>
    </div>
    <div>
      <img alt="" src="/target@2x.png" width="256px" />
    </div>
  </FlexRow>,
  rootElement
)
