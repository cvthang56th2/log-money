import React, {useState, useCallback, useRef, useEffect} from 'react';

interface AutoDisableScrollableProps {
  __ref?: React.RefObject<any>;
  ScrollableComponent: any;
  scrollEnabled?: boolean;
  bounces?: boolean;
  onLayout?: (event: any) => void;
  onContentSizeChange?: (width: number, height: number) => void;
  horizontal?: boolean;
  children?: React.ReactNode;
  style?: any;
}

const AutoDisableScrollable: React.FC<AutoDisableScrollableProps> = ({
  __ref,
  ScrollableComponent,
  scrollEnabled,
  bounces,
  onLayout,
  onContentSizeChange,
  children,
  horizontal,
  ...props
}) => {
  const [container, setContainer] = useState(0);
  const [content, setContent] = useState(0);

  const handleLayout = useCallback(
    (layoutEvent: {nativeEvent: {layout: {width: any; height: any}}}) => {
      const {
        nativeEvent: {
          layout: {width, height},
        },
      } = layoutEvent;
      const newSize = !horizontal ? height : width;
      if (newSize !== container) {
        setContainer(newSize);
      }
      if (typeof onLayout === 'function') {
        onLayout(layoutEvent);
      }
    },
    [container, horizontal, onLayout],
  );

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      const newSize = !horizontal ? height : width;
      if (newSize !== content) {
        setContent(newSize);
      }
      if (typeof onContentSizeChange === 'function') {
        onContentSizeChange(width, height);
      }
    },
    [content, horizontal, onContentSizeChange],
  );

  const scrollEnabledRef = useRef(scrollEnabled);
  useEffect(() => {
    scrollEnabledRef.current = scrollEnabled !== false && content > container;
  }, [scrollEnabled, content, container]);

  const bouncesRef = useRef(bounces);
  useEffect(() => {
    bouncesRef.current = bounces !== false && scrollEnabledRef.current === true;
  }, [bounces, scrollEnabledRef]);

  return (
    <ScrollableComponent
      ref={__ref}
      scrollEnabled={scrollEnabledRef.current}
      bounces={bouncesRef.current}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
      {...props}>
      {children}
    </ScrollableComponent>
  );
};

export default AutoDisableScrollable;
