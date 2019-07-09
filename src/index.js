/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FlexRow, FlexColumn } from "./helpers";
import { SquareButton, Grow, Row } from "./helpers";
import { Subsection } from "./helpers";
import { H1, H2, H3 } from "./headings";
import { theme, styles } from "./theme";
import { Button } from "./button";
import { Icons } from "./icons";
import useOnClickOutside from "use-onclickoutside";

function Section(props) {
  return (
    <FlexColumn
      css={{
        backgroundColor: "hsl(0,0%,95%)",
        boxShadow:
          " 0px 0px .5px 0px hsl(0,0%,70%), 0px 0px 1px 0px hsl(0,0%,70%) ",
        width: "260px",
        ...props.style
      }}
    >
      <FlexRow
        onDoubleClick={props.onTitleDoubleClick}
        css={{
          label: "PanelTitle",
          ...theme.typo.default,
          width: "260px",
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
            label: "PanelBody"
          }}
        >
          {props.children}
        </FlexColumn>
      ) : null}
    </FlexColumn>
  );
}
const ActionSheet = props => (
  <FlexRow css={{ "& > * ": { marginLeft: 4 } }} {...props} />
);

const TargetSelectorPanel = props => {
  // fake data, should probably come from props
  const SAMPLE_PATH = [
    {
      label: "LargeButtonComponent",
      selected: false,
      type: "component",
      target: "ELEM-1"
    },

    {
      label: "ContainerView",
      selected: false,
      type: "element",
      target: "ELEM-13-295"
    },
    {
      label: "MarginComponent",
      selected: false,
      type: "element",
      target: "ELEM-13-295"
    },

    { label: "Label", selected: true, type: "element", target: "ELEM-13-295" }
  ];

  /**
   * renders a single Item
   * @param {*} item: targetSelectorPanelItem
   */
  const ItemLink = props => {
    const appliedStyle = props.item.selected
      ? { fontWeight: 700, "&:hover": { textDecoration: "none" } }
      : {
          "&:hover": props.item.target
            ? { textDecoration: "underline", cursor: "pointer" }
            : {}
        };

    return <span css={{ ...appliedStyle }}>{props.item.label}</span>;
  };

  // separate file
  const PropertySelectorControl = props => {
    // selected: null, or an item ID
    const [selected, setSelected] = useState(null);

    // handle adding state.
    // adding is an interstitial state that
    // adds a row at the top of the list with
    // an input, and react-onclickoutside hoc that cancels the adding state
    // there is nothing actually being added

    const [transientAddingState, setTransientAddingState] = useState(false);

    const AddingRow = props => {
      const handleSubmissionAttempt = e => handleAbandon();
      const handleAbandon = e => setTransientAddingState(false);

      const ref = React.useRef(null);
      useOnClickOutside(ref, handleAbandon);

      const standardUtopiaInputStyle = {
        borderRadius: "2px",
        border: "1px solid grey",
        outline: "none",
        padding: "2px",
        "&:focus": { border: "1px solid #007Aff" }
      };

      return (
        <form onSubmit={() => handleSubmissionAttempt()}>
          {/* todo wrap into onClickOutside that abandons */}
          <span ref={ref}>
            <FlexRow
              css={{
                height: theme.layout.rowHeight.medium,
                marginBottom: 4,
                ...props.style
              }}
            >
              <input
                // the following line autofocuses the element when it's being rendered
                // since the whole adding section gets removed, this works well here.
                // TODO: check this in production

                autoFocus
                css={{
                  // TODO: should use the standard input type, or style instead of standardUtopiaInputStyle
                  ...standardUtopiaInputStyle,
                  flexGrow: 1,
                  marginRight: 8
                }}
                type="text"
                default={props.default || "(variable name, no spaces)"}
              />
              <ActionSheet>
                <Button transparent onClick={() => handleSubmissionAttempt()}>
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
      );
    };

    const SAMPLE_LIST1 = [
      { id: 1, category: "element", label: "Element", selected: false },
      { id: 2, category: "property", label: "customStyle1", selected: true }
    ];
    const SAMPLE_LIST2 = [
      { id: 3, category: "element", label: "Element", selected: true }
    ];

    const SAMPLE_LIST3 = [
      { id: 4, category: "element", label: "Element", selected: false },
      { id: 5, category: "property", label: "customStyle1", selected: false },
      { id: 6, category: "property", label: "anOddStyle", selected: true },
      { id: 7, category: "property", label: "anotherStyle", selected: false }
    ];

    const SAMPLE_ALL_LISTS = [SAMPLE_LIST1, SAMPLE_LIST2, SAMPLE_LIST3];

    const SELECTED_LIST = SAMPLE_ALL_LISTS[Math.round(Math.random() * 2)];

    return (
      <FlexColumn
        css={{
          marginTop: "8px",
          label: "PropertySelectorControl",
          ...props.style
        }}
      >
        <FlexRow>
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
        {transientAddingState ? <AddingRow /> : null}
        {SELECTED_LIST.map(item => (
          <FlexRow style={{ height: theme.layout.rowHeight.medium }}>
            <div
              style={{ display: "inline-block", fontWeight: 600, width: 20 }}
            >
              {item.selected ? "✓" : null}
            </div>
            <span>{item.label}</span>
          </FlexRow>
        ))}
      </FlexColumn>
    );
  };

  const PathControl = SAMPLE_PATH.map((item, index, itemList) => (
    <>
      {item.type === "component" ? (
        <FlexRow style={{ marginRight: 8, paddingTop: 1 }}>
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
  ));

  const PathControlContainer = props => {
    const textStyle =
      props.isInstance || props.isComponent
        ? { color: "#6042f5" }
        : { color: "black" };

    return (
      <FlexRow
        css={{
          ...textStyle,
          marginTop: 8
          // border: "1px solid red"
        }}
      >
        {PathControl}
      </FlexRow>
    );
  };

  const [isOpen, setIsOpen] = useState(true);

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
  );

  return (
    <Section
      style={{ backgroundColor: "hsl(0,0%,99%)" }}
      className={props.className}
      title={<H1 style={{ padding: "4px" }}>{props.target}</H1>}
      actionsheet={TargetSelectorPanelActionSheet}
      open={isOpen}
      onTitleDoubleClick={() => setIsOpen(!isOpen)}
    >
      <FlexColumn style={{ width: "260px" }}>
        <FlexRow
          style={{
            marginLeft: "8px",
            marginRight: "8px",
            minHeight: theme.layout.rowHeight.large
          }}
        >
          <PathControlContainer isComponent />
          <PropertySelectorControl />
        </FlexRow>
      </FlexColumn>
    </Section>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FlexRow css={{ alignItems: "flex-start" }}>
    <div style={{ ...theme.typo.default, height: 592 }}>
      <TargetSelectorPanel
        target="Instance"
        css={{ backgroundColor: "white" }}
      />

      <Section title={<H1>Style</H1>} actionsheet={<div>Actions</div>}>
        <Subsection title="Fill" actions={<div>actionsheet!</div>}>
          <FlexRow style={{ marginLeft: "8px", marginRight: "8px" }}>
            Fill controls here
          </FlexRow>
        </Subsection>
        <Subsection title={<H2>Fill</H2>} actionsheet={<div>Actions</div>}>
          <FlexRow style={{ marginLeft: "8px", marginRight: "8px" }}>
            Color controls here
          </FlexRow>
        </Subsection>
      </Section>
    </div>
    <div>
      <img src="/target@2x.png" width="256px" />
    </div>
  </FlexRow>,
  rootElement
);
