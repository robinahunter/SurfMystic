import Card from '../Card'

export default function HomePage(arrayData) {
    return (
        <>
            <div className='h-[80vh] mx-auto text-center'>
                <h1 className='mx-auto mt-o mb-2'>Surf + Mystic</h1>

            <Card
                arrays={arrayData.arrays}
                refreshQueue={arrayData.getData}
                updateDetails={arrayData.setDetailsData}
                url={`https://api.weather.gov/points/21.2793,-157.8291`}
            />

            </div>
        </>
    )
}