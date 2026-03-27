package com.galaxy.career.carreergalaxyapp.dtos;

import lombok.Data;

import java.util.List;
@Data
public class UpdateSkillsRequestDto {
    private List<String> skills;
}
