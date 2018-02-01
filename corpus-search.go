package main

import (
  "fmt"
  "flag"
  "os"
  "io/ioutil"
  "path/filepath"
)

func main() {
  directoryArg := flag.String("dir", "", "Directory containing text docs")
  flag.Parse()

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

  for _, fileStat := range dirInfo {
    fmt.Printf("%s\n", fileStat.Name())
  }
}
