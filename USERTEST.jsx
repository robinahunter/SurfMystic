
    // // conditionally render NOTES
    // let noteElements = [<p key='0' className='bg-neutral-700 rounded text-center'>No notes yet.</p>]
    // if (notes.length > 0) {
    //     noteElements = notes.map(note => {
    //         return <note 
    //             key={note._id}
    //             data={note}
    //             refreshnotes={refreshnotes}
    //         />
    //     })
    // }
    // // conditionally render favoriteLocations
    // let favoriteLocationElements = [<p key='0' className='bg-neutral-700 rounded text-center'>No favoriteLocations yet.</p>]
    // if (favoriteLocations.length > 0) {
    //     favoriteLocationElements = favoriteLocations.map(favoriteLocation => {
    //         return <favoriteLocation 
    //             key={favoriteLocation._id}
    //             data={favoriteLocation}
    //             refreshfavoriteLocations={refreshfavoriteLocations}
    //         />
    //     })
    // }
    // // conditionally render NOTES
    // let imageElements = [<p key='0' className='bg-neutral-700 rounded text-center'>No images yet.</p>]
    // if (images.length > 0) {
    //     imageElements = images.map(image => {
    //         return <image 
    //             key={image._id}
    //             data={image}
    //             refreshimages={refreshimages}
    //         />
    //     })
    // }

    // // Conditionally render elements based on the length of an array
    // const renderElements = (dataArray, component, refreshFunction) => {
    //   if (dataArray.length === 0) {
    //     return [
    //       <p key='0' className='bg-neutral-700 rounded text-center'>
    //         No {component} yet.
    //       </p>,
    //     ];
    //   }

    //   return dataArray.map((data) => (
    //     React.createElement(component, {
    //       key: data._id,
    //       data: data,
    //       [`refresh${component}`]: refreshFunction,
    //     })
    //   ));
    // };
