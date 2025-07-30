import React, { useCallback, useState } from 'react';
import Gallery from 'devextreme-react/gallery';
import CheckBox from 'devextreme-react/check-box';
import useExtension from '../Hooks/useExtension';

const Extensions = () => {
  const { gallery } = useExtension();
  const galleryData = gallery?.map((item) => ({
    imageSrc: item.imageUrl,
  })) || [];

  const [loop, setLoop] = useState(true);
  const [slideShow, setSlideShow] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);
  const [showIndicator, setShowIndicator] = useState(true);

  const onLoopChanged = useCallback((data) => setLoop(data.value), []);
  const onSlideShowChanged = useCallback((data) => setSlideShow(data.value), []);
  const onShowNavButtonsChanged = useCallback((data) => setShowNavButtons(data.value), []);
  const onShowIndicatorChanged = useCallback((data) => setShowIndicator(data.value), []);

  return (
    <div className="relative">
      <div className="mr-[240px]">
        <Gallery
          id="gallery"
          dataSource={galleryData}
          height={300}
          slideshowDelay={slideShow ? 2000 : 0}
          loop={loop}
          showNavButtons={showNavButtons}
          showIndicator={showIndicator}
          imageExpr="imageSrc"
          className="mx-auto max-w-[450px]"
        />
      </div>

      <div className="absolute top-0 right-0 bottom-0 w-[180px] p-5 bg-[rgba(191,191,191,0.15)]">
        <div className="text-lg font-medium mb-2">Options</div>
        <div className="mt-2">
          <CheckBox
            text="Loop mode"
            value={loop}
            onValueChanged={onLoopChanged}
          />
        </div>
        <div className="mt-2">
          <CheckBox
            text="Slide show"
            value={slideShow}
            onValueChanged={onSlideShowChanged}
          />
        </div>
        <div className="mt-2">
          <CheckBox
            text="Navigation buttons"
            value={showNavButtons}
            onValueChanged={onShowNavButtonsChanged}
          />
        </div>
        <div className="mt-2">
          <CheckBox
            text="Indicator"
            value={showIndicator}
            onValueChanged={onShowIndicatorChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default Extensions;
