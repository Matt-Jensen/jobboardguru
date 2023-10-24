import { useState, useEffect } from 'react';
import progress from '../services/progress';

interface Member {
  name?: string
  ownership?: number
  businessEntity?: boolean
}

interface Result {
  members: Member[]
  totalOwnership: number
  addMember: () => void
  updateMember: (member: Member, update: Member) => void
  removeMember: (member: Member) => void
}

export default function useMembers(
): Result {
  let isMounted = true;
  const [members, setMembers] = useState([{}]);
  const [totalOwnership, setTotalOwnership] = useState(0);

  // Update the total ownership value
  const updateTotalOwnership = () => {
    if (!isMounted) return;
    const updatedOwnsership = members.reduce((acc: number, member: any) => {
      acc += (member.ownership || 0);
      return acc;
    }, 0) as number;
    setTotalOwnership(updatedOwnsership);
  };

  //
  // Handlers
  //

  // Append an empty member
  const addMember = () => {
    if (!isMounted) return;
    members.push({});
    setMembers([...members]);
    progress.notifyProgressUpdated();
  };

  // Update a member and sync total ownership value
  const updateMember = (member: Member, update: Member) => {
    if (!isMounted) return;
    const result = JSON.parse(JSON.stringify(update));
    const isOwnershipUpdate = typeof update.ownership !== 'undefined';

    // Remove invalid ownership update
    if (
      isOwnershipUpdate
      && (result.ownership + totalOwnership - (member.ownership || 0)) > 100
      || isNaN(result.ownership)) {
      delete result.ownership;
    }

    Object.assign(member, result);
    setMembers([...members]);

    // Sync total ownership
    if (typeof result.ownership !== 'undefined') {
      updateTotalOwnership();
    }
  };

  // Remove an added member
  const removeMember = (member: Member) => {
    if (!isMounted) return;
    members.splice(members.indexOf(member), 1);
    setMembers([...members]);
    updateTotalOwnership();
    progress.notifyProgressUpdated();
  };

  // Prevent setting state
  // on unmounted hook
  useEffect(() => () => {
    isMounted = false;
  }, []);

  return {
    members,
    totalOwnership,
    addMember,
    updateMember,
    removeMember
  };
}