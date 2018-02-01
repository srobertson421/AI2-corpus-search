package main

import (
  "fmt"
  "flag"
  "os"
  "io/ioutil"
  "path/filepath"
  "regexp"
  "strings"
)

func main() {
  directoryArg := flag.String("dir", "", "Directory containing text docs")
  flag.Parse()

  words := flag.Args()

  if *directoryArg == "" {
    flag.PrintDefaults()
    os.Exit(1)
  }

  absDirectory, err := filepath.Abs(*directoryArg)
  if err != nil {
    fmt.Print(err)
  }

  dirInfo, err := ioutil.ReadDir(absDirectory)
  if err != nil {
    fmt.Print(err)
  }

  regex, err := regexp.Compile("[^a-zA-Z0-9 ]+")
  if err != nil {
    fmt.Print(err)
  }

  countMap := make(map[string]map[string]float64)

  for _, fileStat := range dirInfo {
    fileName := fileStat.Name()
    countMap[fileName] = make(map[string]float64)

    for _, word := range words {
      countMap[fileName][word] = 0
    }

    absFilePath, err := filepath.Abs(filepath.Join(*directoryArg, fileStat.Name()))
    if err != nil {
      fmt.Print(err)
    }

    bytes, err := ioutil.ReadFile(absFilePath)
    if err != nil {
      fmt.Print(err)
    }

    content := string(bytes)
    processedContent := strings.ToLower(regex.ReplaceAllString(content, ""))
    splitContent := strings.Fields(processedContent)

    for _, content := range splitContent {
      for _, word := range words {
        if(word == content) {
          countMap[fileName][word] = float64(countMap[fileName][word] + 1) / float64(len(splitContent))
        }
      }
    }
  }

  resultsMap := make(map[string]map[string]float64)

  for _, word := range words {
    resultsMap[word] = make(map[string]float64)
  }

  for word, _ := range resultsMap {
    previousScore := float64(0)
    for fileName, termMap := range countMap {
      tfScore := termMap[word]
      if previousScore == float64(0) {
        previousScore = tfScore
        resultsMap[word][fileName] = tfScore
      } else {
        if tfScore > previousScore {
          resultsMap[word] = make(map[string]float64)
          resultsMap[word][fileName] = tfScore
          previousScore = tfScore
        }
      }
    }
  }

  for word, fileMap := range resultsMap {
    for fileName, tfScore := range fileMap {
      fmt.Println(word, "-", fileName, "-", tfScore)
    }
  }
}
