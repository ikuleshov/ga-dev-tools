// Copyright 2020 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from "react"

import Layout from "../../components/layout"
import ViewSelector, { HasView } from "../../components/ViewSelector"

const QueryExplorer = () => {
  const [ids, setIds] = React.useState<string>("")
  const [summary, setView] = React.useState<HasView | undefined>(undefined)
  const [queryResults, setQueryResults] = React.useState<string>("")

  // When the summary is updated, update the selected ids
  React.useEffect(() => {
    if (summary !== undefined) {
      const view = summary.view
      if (view !== undefined) {
        const id = view.id
        if (id !== undefined) {
          setIds(id)
        }
      }
    }
    // The array [summary] tells react to re-run the function passed to
    // useEffect anytime the "summary" variable changes.
  }, [summary])

  const runQuery = React.useCallback(() => {
    // Wait for 3 seconds because we're pretending like this is a web call
    setTimeout(() => {
      setQueryResults(`You called the function with this id: ${ids}`)
    }, 3000)
  }, [ids])

  return (
    <Layout title="Query Explorer">
      <ViewSelector onViewChanged={setView} />
      <button onClick={runQuery}>Run Query</button>
      <label>Ids:</label>
      <input
        className="FormField FormFieldCombo-field"
        name="ids"
        value={ids}
        onChange={event => {
          // If the user manually updates this value, overwrite anything that
          // the viewSelector returned.
          setIds(event.target.value)
        }}
      />
      <br />
      <div>{queryResults}</div>
    </Layout>
  )
}
export default QueryExplorer
