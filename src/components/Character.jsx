import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Individual draggable character card with character data.
const Character = ({ character, index }) => {
  // Removes the drop animation so there isn't a delay between the character being dropped and the line count updating
  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    // transitionDuration cannot be set to zero, react-beautiful-dnd docs explain that there needs to be a transition duration
    // for the onTransitionEnd event to fire, which is how it knows the drop animation is finished.
    return {
      ...style,
      transitionDuration: '0.001s'
    };
  }

  return (
    <Draggable draggableId={character.id} index={index} key={character.id}>
      {(provided, snapshot) => (
        <div className='assignedCharacter'
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
             style={getStyle(provided.draggableProps.style, snapshot)}>
          <p>{character.name}</p>
          <p>{`Lines: ${character.lineCount}`}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Character;
