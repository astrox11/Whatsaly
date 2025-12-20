import type { Contact, GroupMetadata, WASocket } from "baileys";
import { GetGroupMeta } from "../sql";

export class Group {
  client: WASocket;
  metadata: GroupMetadata;
  constructor(id: string, client: WASocket) {
    this.metadata = GetGroupMeta(id);
    this.client = client;
  }

  async Promote(participant: Contact["id"]) {
    const exists = this.metadata.participants.map((id) => id.lid);
    if (exists.includes(participant)) {
      return await this.client.groupParticipantsUpdate(
        this.metadata.id,
        [participant],
        "promote",
      );
    }
    return null;
  }

  async Demote(participant: Contact["id"]) {
    const exists = this.metadata.participants.map((id) => id.lid);
    if (exists.includes(participant)) {
      return await this.client.groupParticipantsUpdate(
        this.metadata.id,
        [participant],
        "demote",
      );
    }
    return null;
  }

  async Remove(participant: Contact["id"]) {
    const exists = this.metadata.participants.map((id) => id.lid);
    if (exists.includes(participant)) {
      return await this.client.groupParticipantsUpdate(
        this.metadata.id,
        [participant],
        "remove",
      );
    }
    return null;
  }

  async Add(participant: Contact["id"]) {
    return await this.client.groupParticipantsUpdate(
      this.metadata.id,
      [participant],
      "add",
    );
  }

  async Leave() {
    return await this.client.groupLeave(this.metadata.id);
  }

  async Name(name: string) {
    return await this.client.groupUpdateSubject(this.metadata.id, name);
  }

  async Description(description: string) {
    return await this.client.groupUpdateDescription(
      this.metadata.id,
      description,
    );
  }
}
