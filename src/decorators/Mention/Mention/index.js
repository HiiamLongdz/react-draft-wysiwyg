import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

class Mention {
  constructor(className) {
    this.className = className;
  }

  getMentionComponent = () => {
    const className = this.className;
    const MentionComponent = ({ entityKey, children, contentState }) => {
      return (
        <span className={classNames("rdw-mention-link", className)}>
          {children}
        </span>
      );
    };
    MentionComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };
    return MentionComponent;
  };
  getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: this.getMentionComponent(),
  });
}

Mention.prototype.findMentionEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "MENTION"
    );
  }, callback);
};

export default Mention;
