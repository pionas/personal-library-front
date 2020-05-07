import React from "react";

export default function AnythingDetails({ anything }) {
  switch (anything.__typename) {
    default: {
      return <p>Unsupported __typename - [{anything.__typename}]</p>;
    }
  }
}
