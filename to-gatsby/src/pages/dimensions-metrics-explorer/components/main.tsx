// Copyright 2019 Google Inc. All rights reserved.
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

/// <reference path = "../../../global.d.ts" />

import * as React from "react"
import { useSelector } from "react-redux"
import { Set } from "immutable"

//import { useLocalStorage, useTypedLocalStorage } from "../../../hooks";

import { getAnalyticsApi } from "../../../api"

const Main: React.FC = () => {
  // Fetch all of the columns from the metadata API
  // https://www.googleapis.com/discovery/v1/apis/name/version/rest
  const gapi = useSelector((state: AppState) => state.gapi)
  React.useEffect(() => {
    if (gapi === undefined) return
    gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/analytics/v3/rest")
      .then(() => {
        var request = gapi.client.analytics.metadata.columns.list({
          reportType: "ga",
        })
        request.execute(console.log)
      })
  }, [gapi])

  return <div>Main test</div>
}

export default Main
