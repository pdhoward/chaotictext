import React          from 'react';

const Sentiment = ({sentiment}) => {
    return (
        <div className={'sentiment message-info ' + sentiment}>
            <h4 className='key'>Sentiment: </h4>
            <h4 className='value'>{sentiment}</h4>
        </div>
    )
}

const Route = ({keywords}) => {

    const luggage = ['bag', 'bags','baggage', 'luggage']
    const customer_service = ['flight crew', 'flight attendant', 'stewardess', 'customer service', 'stewardesses', 'flight attendants',]
    const weather_delay = ['weather delay', 'weather', 'weather delays']

    let valString = '';
    let topRel = 0
    if (keywords != {} ){
        for (let k in keywords){
            let relevance = keywords[k]['relevance']
            if (luggage.indexOf(k.toLowerCase()) != -1 &&  relevance > topRel){
                valString = 'Luggage'
                topRel = relevance
            } else if (customer_service.indexOf(k.toLowerCase()) != -1 &&  relevance > topRel){

                valString ='Customer Service'
                topRel = relevance
            } else if (weather_delay.indexOf(k.toLowerCase()) != -1 &&  relevance > topRel){
                valString ='Weather Delay'
                topRel = relevance
            }
        }
    }
    return (
        <div className='route message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Route: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}

const Entities = ({entities}) => {
    console.log("---ENTERED ENTITIES FUNCTION--------")
    console.log({entities: entities})
    let valString = '';
    if (entities != {} ){
        valString = Object.keys(entities).join(', ')
    }

    return (
        <div className='entities message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Entities: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}

const Concepts = ({concepts}) => {

  console.log("---ENTERED CONCEPT FUNCTION--------")
  console.log({concepts: concepts})

    let valString = '';
    if (concepts != {} ){
        valString = Object.keys(concepts).join(', ')
    }

    return (
        <div className='concepts message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Concepts: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}


const Channel = ({channel}) => {
    let valString = '';
    if (channel != {} ){
        valString = Object.keys(channel).join(', ')
    }
    return (
        <div className='channels message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Channel: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}

const Parts = ({parts}) => {
    let valString = '';
    if (parts != {} ){
        valString = Object.keys(parts).join(', ')
    }
    return (
        <div className='parts message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>POS: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}
const Bad = ({bad}) => {
    let valString = '';
    if (bad != {} ){
        valString = Object.keys(bad).join(', ')
    }
    return (
        <div className='bad message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Disallowed: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}
const Context = ({context}) => {
    let valString = '';
    if (context != {} ){
        valString = Object.keys(context).join(', ')
    }
    return (
        <div className='context message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Context: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}
const Intent = ({intent}) => {
    let valString = '';
    if (intent != {} ){
        valString = Object.keys(intent).join(', ')
    }
    return (
        <div className='intent message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Intent: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}

const Bot = ({bot}) => {
    let valString = '';
    if (bot != {} ){
        valString = Object.keys(bot).join(', ')
    }
    return (
        <div className='bot message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Bot: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}
const Watson = ({watson}) => {
    let valString = '';
    if (watson != {} ){
        valString = Object.keys(watson).join(', ')
    }
    return (
        <div className='watson message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Watson: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}
const Wit = ({wit}) => {
    let valString = '';
    if (wit != {} ){
        valString = Object.keys(wit).join(', ')
    }
    return (
        <div className='wit message-info' style={valString=='' ? {display:'none'}:{}}>
            <h4 className='key'>Wit: </h4>
            <h4 className='value'>{valString}</h4>
        </div>
    )
}



module.exports = {
    Sentiment,
    Route,
    Entities,
    Concepts,
    Bad,
    Channel,
    Context,
    Intent,
    Parts,
    Wit,
    Watson,
    Bot
}
