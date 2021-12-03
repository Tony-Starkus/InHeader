import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { defineLinks } from "../InHeader/utils/functions";
import { SearchPersons } from "../InHeader/utils/types";

interface Props {
  person: SearchPersons;
  liProps: React.HTMLAttributes<HTMLLIElement>;
  production: boolean;
  noAvatar: string;
  getS3Object: (path: string) => Promise<string>;
}

const RenderPerson: React.FC<Props> = ({ liProps, noAvatar, production, person, getS3Object }) => {
  const links = defineLinks(production);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getS3Object(person.avatar)
      .then(data => setUrl(data))
      .catch(err => console.error(err));
  }, [person, setUrl]);

  return (
    <li {...liProps} key={`${person.username}`}>
      <a
        href={`${links.web?.social}p/${person.username}`}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textDecoration: "none",
          color: "#747474",
        }}
      >
        <Avatar src={url || noAvatar} />
        <div
          style={{
            marginLeft: "5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          >
            {person.name}
          </span>
          {person.type === "COMPANY" && <span style={{ fontSize: "11px", marginTop: "-2px" }}>Perfil de empresa</span>}
        </div>
      </a>
    </li>
  );
};

export default RenderPerson;
