import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState, uploadFiles} from "/utils/state"
import "focus-visible/dist/focus-visible"
import "katex/dist/katex.min.css"
import {Alert, AlertIcon, AlertTitle, Box, Button, Center, Code, Heading, Link, ListItem, OrderedList, Stat, StatArrow, StatGroup, StatHelpText, Text, UnorderedList, VStack, useColorMode} from "@chakra-ui/react"
import ReactMarkdown from "react-markdown"
import {Prism} from "react-syntax-highlighter"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import NextHead from "next/head"

const PING = "http://localhost:8000/ping"
const EVENT = "ws://localhost:8000/event"
const UPLOAD = "http://localhost:8000/upload"
export default function Component() {
const [state, setState] = useState({"status": 0, "events": [{"name": "state.hydrate"}], "files": []})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const socket = useRef(null)
const { isReady } = router;
const { colorMode, toggleColorMode } = useColorMode()
const Event = events => setState({
  ...state,
  events: [...state.events, ...events],
})
const File = files => setState({
  ...state,
  files,
})
useEffect(() => {
  if(!isReady) {
    return;
  }
  if (!socket.current) {
    connect(socket, state, setState, result, setResult, router, EVENT, ['websocket', 'polling'])
  }
  const update = async () => {
    if (result.state != null) {
      setState({
        ...result.state,
        events: [...state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(state, setState, result, setResult, router, socket.current)
  }
  update()
})
return (
<Center sx={{"paddingTop": "5%"}}><VStack spacing="0.3em"
sx={{"fontSize": "2em", "width": "50%"}}><Heading sx={{"fontSize": "1em"}}>{`Server Status`}</Heading>
<Heading sx={{"fontSize": 24}}>{state.status}</Heading>
<Button onClick={() => Event([E("state.api_status", {})])}
size="sm"
sx={{"color": "primary"}}
variant="outline">{`Refresh`}</Button>
<Alert status="warning"
variant="subtle"><AlertIcon/>
<AlertTitle><Box><ReactMarkdown components={{"h1": ({node, ...props}) => <Heading size='2xl' {...props} />, "h2": ({node, ...props}) => <Heading size='xl' {...props} />, "h3": ({node, ...props}) => <Heading size='lg' {...props} />, "ul": UnorderedList, "ol": OrderedList, "li": ListItem, "p": Text, "a": Link, "code": ({node, inline, className, children, ...props}) =>                      {         const match = (className || '').match(/language-(?<lang>.*)/);         return !inline ? (           <Prism             children={String(children).replace(/ $/, '')}             language={match ? match[1] : ''}             {...props}           />         ) : (           <Code {...props}>             {children}           </Code>         );       }}}
rehypePlugins={[rehypeKatex, rehypeRaw]}
remarkPlugins={[remarkMath, remarkGfm]}>{`## API Gateway`}</ReactMarkdown>
<StatGroup sx={{"width": "100%"}}><Stat><StatHelpText>{`Staging`}
<StatArrow type="increase"/></StatHelpText></Stat>
<Stat><StatHelpText>{`Production`}
<StatArrow type="decrease"/></StatHelpText></Stat></StatGroup></Box></AlertTitle></Alert>
<Alert status="error"
variant="subtle"><AlertIcon/>
<AlertTitle><Box><ReactMarkdown components={{"h1": ({node, ...props}) => <Heading size='2xl' {...props} />, "h2": ({node, ...props}) => <Heading size='xl' {...props} />, "h3": ({node, ...props}) => <Heading size='lg' {...props} />, "ul": UnorderedList, "ol": OrderedList, "li": ListItem, "p": Text, "a": Link, "code": ({node, inline, className, children, ...props}) =>                      {         const match = (className || '').match(/language-(?<lang>.*)/);         return !inline ? (           <Prism             children={String(children).replace(/ $/, '')}             language={match ? match[1] : ''}             {...props}           />         ) : (           <Code {...props}>             {children}           </Code>         );       }}}
rehypePlugins={[rehypeKatex, rehypeRaw]}
remarkPlugins={[remarkMath, remarkGfm]}>{`## Orion Service`}</ReactMarkdown>
<StatGroup sx={{"width": "100%"}}><Stat><StatHelpText>{`Staging`}
<StatArrow type="decrease"/></StatHelpText></Stat>
<Stat><StatHelpText>{`Production`}
<StatArrow type="decrease"/></StatHelpText></Stat></StatGroup></Box></AlertTitle></Alert>
<Alert status="success"
variant="subtle"><AlertIcon/>
<AlertTitle><Box><ReactMarkdown components={{"h1": ({node, ...props}) => <Heading size='2xl' {...props} />, "h2": ({node, ...props}) => <Heading size='xl' {...props} />, "h3": ({node, ...props}) => <Heading size='lg' {...props} />, "ul": UnorderedList, "ol": OrderedList, "li": ListItem, "p": Text, "a": Link, "code": ({node, inline, className, children, ...props}) =>                      {         const match = (className || '').match(/language-(?<lang>.*)/);         return !inline ? (           <Prism             children={String(children).replace(/ $/, '')}             language={match ? match[1] : ''}             {...props}           />         ) : (           <Code {...props}>             {children}           </Code>         );       }}}
rehypePlugins={[rehypeKatex, rehypeRaw]}
remarkPlugins={[remarkMath, remarkGfm]}>{`## Orion Nebula Service`}</ReactMarkdown>
<StatGroup sx={{"width": "100%"}}><Stat><StatHelpText>{`Staging`}
<StatArrow type="increase"/></StatHelpText></Stat>
<Stat><StatHelpText>{`Production`}
<StatArrow type="increase"/></StatHelpText></Stat></StatGroup></Box></AlertTitle></Alert>
<Alert status="warning"
variant="subtle"><AlertIcon/>
<AlertTitle><Box><ReactMarkdown components={{"h1": ({node, ...props}) => <Heading size='2xl' {...props} />, "h2": ({node, ...props}) => <Heading size='xl' {...props} />, "h3": ({node, ...props}) => <Heading size='lg' {...props} />, "ul": UnorderedList, "ol": OrderedList, "li": ListItem, "p": Text, "a": Link, "code": ({node, inline, className, children, ...props}) =>                      {         const match = (className || '').match(/language-(?<lang>.*)/);         return !inline ? (           <Prism             children={String(children).replace(/ $/, '')}             language={match ? match[1] : ''}             {...props}           />         ) : (           <Code {...props}>             {children}           </Code>         );       }}}
rehypePlugins={[rehypeKatex, rehypeRaw]}
remarkPlugins={[remarkMath, remarkGfm]}>{`## OCR Service`}</ReactMarkdown>
<StatGroup sx={{"width": "100%"}}><Stat><StatHelpText>{`Staging`}
<StatArrow type="increase"/></StatHelpText></Stat>
<Stat><StatHelpText>{`Production`}
<StatArrow type="decrease"/></StatHelpText></Stat></StatGroup></Box></AlertTitle></Alert>
<Alert status="warning"
variant="subtle"><AlertIcon/>
<AlertTitle><Box><ReactMarkdown components={{"h1": ({node, ...props}) => <Heading size='2xl' {...props} />, "h2": ({node, ...props}) => <Heading size='xl' {...props} />, "h3": ({node, ...props}) => <Heading size='lg' {...props} />, "ul": UnorderedList, "ol": OrderedList, "li": ListItem, "p": Text, "a": Link, "code": ({node, inline, className, children, ...props}) =>                      {         const match = (className || '').match(/language-(?<lang>.*)/);         return !inline ? (           <Prism             children={String(children).replace(/ $/, '')}             language={match ? match[1] : ''}             {...props}           />         ) : (           <Code {...props}>             {children}           </Code>         );       }}}
rehypePlugins={[rehypeKatex, rehypeRaw]}
remarkPlugins={[remarkMath, remarkGfm]}>{`## Whisper Service`}</ReactMarkdown>
<StatGroup sx={{"width": "100%"}}><Stat><StatHelpText>{`Staging`}
<StatArrow type="increase"/></StatHelpText></Stat>
<Stat><StatHelpText>{`Production`}
<StatArrow type="decrease"/></StatHelpText></Stat></StatGroup></Box></AlertTitle></Alert></VStack>
<NextHead><title>{`Server Status`}</title>
<meta content="A simple server status page for my fellow devs"
name="description"/>
<meta content="favicon.ico"
property="og:image"/></NextHead></Center>
)
}