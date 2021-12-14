import React, {useState, useEffect} from 'react';
import {Meme} from "./components/Meme";

import './App.css';

const objToQueryParam = (obj) => {
  const parameters = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return "?" + parameters.join("&")
}

function App() {

  const [templates, setTemplates] = useState([]) // By default this is an empty array.
  const [template, setTemplate] = useState(null)
  const [topText, setTopText] = useState("") 
  const [bottomText, setBottomText] = useState("") 
  const [meme, setMeme] = useState(null)



  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response =>
         setTemplates(response.data.memes))) // Setting the state based on the response we get.
 
  }, []) // We only want the useEffect to run after the first render, so we put an empty array in the second paramaeter.

  if (meme) {
    return (
    <div>
      <img src={meme} alt="created meme"/>
    </div>
    )
  }
  
  return (
    <>
    <div>
      {template && (
        <form onSubmit = {async e => {
          e.preventDefault()
          // Add logic to create meme
          const parameters = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: "hikopag",
            password: "k77x2W2zsnjUpH4"

          }
          const response = await fetch(
            `https://api.imgflip.com/caption_image${objToQueryParam(parameters)}`
          )
          const json = await response.json()
          setMeme(json.data.url)
        }}
        >
          <Meme template = {template} />
          <input 
            placeholder="Top Text"
            value = {topText}
            onChange = {e => setTopText(e.target.value)}
          />
          <input 
            placeholder = "Botom Text" 
            value = {bottomText}
            onChange = {e => setBottomText(e.target.value)}
          />
          <button type="submit">Create meme</button>
        </form>
      )}

      {!template && (
        <>
        <h1> Pick a Template For Your Meme Creation</h1>
        {templates.map(template => {
        return (
          <Meme
            template={template}
            onClick={() => {
              setTemplate(template)
            }}
          /> 
        )
      })}
      </>
      )}
    </div>
    </>
  );
}

export default App;


// API source: https://imgflip.com/api
