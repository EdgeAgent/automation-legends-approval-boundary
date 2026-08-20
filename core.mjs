export function buildApprovalRecord(input) {
  const proposal = input.proposal || "No proposed action supplied.";
  const evidence = Array.isArray(input.evidence) ? input.evidence : [];
  const constraints = Array.isArray(input.constraints) ? input.constraints : [];
  return {
    proposal,
    evidence,
    constraints: [...constraints, "The agent must not execute the proposed action directly."],
    approval_question: input.approval_question || `Do you approve this action: ${proposal}`,
    decline_or_revise_path: input.decline_or_revise_path || "Decline to stop. Revise the proposal with new evidence, then submit a new approval record.",
    status: "awaiting_human_approval",
    reviewer: null,
    reviewed_at: null,
  };
}
