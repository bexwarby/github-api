import * as React from "react"
import { Box, Input, Text, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const wrapperSx = {
    display: "flex",
    justifyContent: "center",
    p: 4,
    bgColor: "white",
    alignItems: "center",
    flexDirection: "column",
    width: "100%"
}

export const SearchPage: React.FC = ({...props}) => {

    // Need to set the repos and then rank by start
    const [gitData, setGitData] = useState({
        username: "",
        name: "",
        avatar: "",
        followers: "",
        homeUrl: "",
        notFound: "",
    })
    // Probably not needed - need to see
    const [gitUser, setGitUser] = useState("")
    
    // These links to data aren't correct - 
    // need to check within each repos (data is there)
    const fetchData = () => {
        return fetch(`https://api.github.com/users/${gitUser}/repos`)
          .then((response) => response.json())
          .then((data) => setGitData({
            username: data.login,
            name: data.name,
            avatar: data.avatar_url,
            followers: data.followers,
            homeUrl: data.html_url,
            notFound: data.message
          }));
    }

    // Figure our how to then rank top 5 repos here
   /*  const repos = [gitData[0], gitData[1], gitData[2], gitData[3], gitData[4]]
    console.log(repos) */

    // triggers every time button is pressed
    useEffect(() => {
        fetchData()
      }, [])


    return (
        <Box 
            sx={wrapperSx} 
            bgPosition="center"
            bgRepeat="no-repeat"
        >
            <Text as="h1">Search GitHub User:</Text>
            <Input 
                type="text" 
                placeholder="Search username" 
                onChange={(e) => setGitUser(e.target.value)} 
            />
            <Button onClick={fetchData}>Let's go</Button>
        
            {/* To continue once data is correctly filtered */}
            {/* {gitData ?? <Text>{gitData?.username}</Text>} */}
        </Box>
    )
}